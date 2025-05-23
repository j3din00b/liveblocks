import * as fc from "fast-check";

import type * as AST from "../../ast";
import { ErrorReporter } from "../../lib/error-reporting";
import { parseDocument } from "../../parser";
import { check } from "..";

describe("checker", () => {
  it("type checking a full document", () => {
    const schemaText = `
      type IamStatic {}

      type Storage {
        x: IamStatic
        y: LiveObject<IamLive>
      }

      type IamLive {}
    `;

    const reporter = ErrorReporter.fromText(schemaText);
    const output = check(parseDocument(reporter), reporter);

    expect(output).toEqual({
      root: {
        _kind: "ObjectTypeDefinition",
        name: {
          _kind: "TypeName",
          name: "Storage",
        },
        isStatic: false,
        leadingComment: null,
        fields: [
          {
            _kind: "FieldDef",
            leadingComment: null,
            trailingComment: null,
            name: {
              _kind: "Identifier",
              name: "x",
            },
            optional: false,
            type: {
              _kind: "TypeRef",
              asLiveObject: false,
              ref: {
                _kind: "TypeName",
                name: "IamStatic",
              },
            },
          },
          {
            _kind: "FieldDef",
            leadingComment: null,
            trailingComment: null,
            name: {
              _kind: "Identifier",
              name: "y",
            },
            optional: false,
            type: {
              _kind: "TypeRef",
              ref: {
                _kind: "TypeName",
                name: "IamLive",
              },
              asLiveObject: true,
            },
          },
        ],
      },

      ast: expect.any(Object),
      definitions: expect.any(Array),
      getDefinition: expect.any(Function),
    });

    const x = output.root.fields[0].type as AST.TypeRef;
    expect(output.getDefinition(x)).toEqual({
      _kind: "ObjectTypeDefinition",
      name: {
        _kind: "TypeName",
        name: "IamStatic",
      },
      isStatic: true,
      leadingComment: null,
      fields: [],
    });

    const y = output.root.fields[1].type as AST.TypeRef;
    expect(output.getDefinition(y)).toEqual({
      _kind: "ObjectTypeDefinition",
      name: {
        _kind: "TypeName",
        name: "IamLive",
      },
      isStatic: false,
      leadingComment: null,
      fields: [],
    });
  });

  it("should reject definitions using legacy built-in type names", () => {
    fc.assert(
      fc.property(
        fc.constantFrom(
          "BOOLEAN",
          "Boolean",
          "FLOAT",
          "Float",
          "INT",
          "Int",
          "NUMBER",
          "Null",
          "Number",
          "STRING",
          "String",
          "boolean",
          "float",
          "int",
          "nULL",
          "null",
          "number",
          "string"
        ),
        fc.boolean(),

        (name, allowLegacyBuiltins) => {
          const schemaText = `
            type ${name} {}
            type Storage { x: ${name} }
          `;

          const reporter = ErrorReporter.fromText(schemaText);
          expect(() =>
            check(parseDocument(reporter, { allowLegacyBuiltins }), reporter)
          ).toThrow();
        }
      )
    );
  });

  it("should accept definitions using safe type names", () => {
    fc.assert(
      fc.property(
        fc.constantFrom(
          "BOOLEAN",
          "Boolean",
          "FLOAT",
          "Float",
          "INT",
          "Int",
          "NUMBER",
          "Null",
          "Number",
          "STRING",
          "String",
          "boolean",
          "float",
          "int",
          "nULL",
          "null",
          "number",
          "string"
        ),
        fc.boolean(),

        (name, allowLegacyBuiltins) => {
          const schemaText = `
            type Prefix${name} {}
            type Storage { x: Prefix${name} }
          `;

          const reporter = ErrorReporter.fromText(schemaText);
          expect(() =>
            check(parseDocument(reporter, { allowLegacyBuiltins }), reporter)
          ).not.toThrow();
        }
      )
    );
  });

  it("large legacy document (snapshot test)", () => {
    const schemaText = `
      // union Shape = Rect | Circle

      type RGB { r: Int, g: Int, b: Int }

      type Rect {
        type: "rect"
        x: Int
        y: Int
        width: Int
        height: Int
        fills?: RGB[]
        strokes?: LiveList<RGB>
      }

      type Circle {
        type: "circle"
        cx: Int
        cy: Int
        radius: Int
        fill ? : RGB
        stroke?: RGB
      }

      type Storage {
        // shapes: LiveList<Shape>
        mycircle: LiveObject<Circle> | null
        myrect: LiveObject<Rect> | String | null
      }
    `;

    const reporter = ErrorReporter.fromText(schemaText);
    const output = check(
      parseDocument(reporter, { allowLegacyBuiltins: true }),
      reporter
    );
    expect(output).toMatchSnapshot();
  });

  it("large document (snapshot test)", () => {
    const schemaText = `
      // union Shape = Rect | Circle

      type RGB { r: number, g: number, b: number }

      type Rect {
        type: string  # TODO: Use "rect" here
        x: number
        y: number
        width: number
        height: number
        fills?: RGB[]
        strokes?: LiveList<RGB>
      }

      type Circle {
        type: string // TODO: Use "circle" here
        cx: number
        cy: number
        radius: number
        fill ? : RGB
        stroke?: RGB
      }

      type Storage {
        // shapes: LiveList<Shape>
        mycircle: LiveObject<Circle>
        myrect: LiveObject<Rect>
      }
    `;

    const reporter = ErrorReporter.fromText(schemaText);
    const output = check(parseDocument(reporter), reporter);
    expect(output).toMatchSnapshot();
  });
});
