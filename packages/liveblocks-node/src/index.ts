import { detectDupes } from "@liveblocks/core";

import type { RoomData } from "./client";
import { PKG_FORMAT, PKG_NAME, PKG_VERSION } from "./version";

detectDupes(PKG_NAME, PKG_VERSION, PKG_FORMAT);

export type {
  CreateRoomOptions,
  GetInboxNotificationsOptions,
  GetRoomsOptions,
  InboxNotificationsQueryCriteria,
  LiveblocksOptions,
  MassMutateStorageCallback,
  MassMutateStorageOptions,
  MutateStorageCallback,
  MutateStorageOptions,
  Page,
  PaginationOptions,
  RoomAccesses,
  RoomData,
  RoomPermission,
  RoomsQueryCriteria,
  RoomUser,
  Schema,
  ThreadParticipants,
  UpdateRoomOptions,
  UpsertRoomOptions,
} from "./client";
export { Liveblocks, LiveblocksError } from "./client";
export type {
  CommentCreatedEvent,
  CommentDeletedEvent,
  CommentEditedEvent,
  CommentReactionAdded,
  CommentReactionRemoved,
  CustomNotificationEvent,
  NotificationEvent,
  RoomCreatedEvent,
  RoomDeletedEvent,
  StorageUpdatedEvent,
  TextMentionNotificationEvent,
  ThreadCreatedEvent,
  ThreadDeletedEvent,
  ThreadMarkedAsResolvedEvent,
  ThreadMarkedAsUnresolvedEvent,
  ThreadMetadataUpdatedEvent,
  ThreadNotificationEvent,
  UserEnteredEvent,
  UserLeftEvent,
  WebhookEvent,
  WebhookRequest,
  YDocUpdatedEvent,
} from "./webhooks";
export {
  isCustomNotificationEvent,
  isTextMentionNotificationEvent,
  isThreadNotificationEvent,
  WebhookHandler,
} from "./webhooks";
export type {
  CommentBody,
  CommentBodyBlockElement,
  CommentBodyElement,
  CommentBodyInlineElement,
  CommentBodyLink,
  CommentBodyLinkElementArgs,
  CommentBodyMention,
  CommentBodyMentionElementArgs,
  CommentBodyParagraph,
  CommentBodyParagraphElementArgs,
  CommentBodyText,
  CommentBodyTextElementArgs,
  CommentData,
  CommentUserReaction,
  IUserInfo,
  Json,
  JsonArray,
  JsonObject,
  JsonScalar,
  LiveStructure,
  Lson,
  LsonObject,
  PlainLsonObject,
  ResolveUsersArgs,
  StringifyCommentBodyElements,
  StringifyCommentBodyOptions,
  ThreadData,
  User,
} from "@liveblocks/core";
export {
  getMentionedIdsFromCommentBody,
  isNotificationChannelEnabled,
  LiveList,
  LiveMap,
  LiveObject,
  stringifyCommentBody,
} from "@liveblocks/core";

/**
 * @deprecated RoomInfo was renamed to RoomData, to avoid
 * confusion with the globally augmentable RoomInfo type. This
 * alias will be removed in a future version.
 */
export type RoomInfo = RoomData;
