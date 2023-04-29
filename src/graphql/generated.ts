import gql from 'graphql-tag';
import * as VueApolloComposable from '@vue/apollo-composable';
import * as VueCompositionApi from 'vue';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type ReactiveFunction<TParam> = () => TParam;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
  DateTime: any;
  Hex: any;
  Json: any;
  Long: any;
  RGBAHue: any;
  RGBATransparency: any;
  RichTextAST: any;
};

export type Account = Node & {
  __typename?: 'Account';
  avatar?: Maybe<Asset>;
  /** The time the document was created */
  createdAt: Scalars['DateTime'];
  /** User that created this document */
  createdBy?: Maybe<User>;
  /** Get the document in other stages */
  documentInStages: Array<Account>;
  email: Scalars['String'];
  expenses: Array<Expense>;
  /** List of Account versions */
  history: Array<Version>;
  /** The unique identifier */
  id: Scalars['ID'];
  name: Scalars['String'];
  password: Scalars['String'];
  /** The time the document was published. Null on documents in draft stage. */
  publishedAt?: Maybe<Scalars['DateTime']>;
  /** User that last published this document */
  publishedBy?: Maybe<User>;
  scheduledIn: Array<ScheduledOperation>;
  /** System stage field */
  stage: Stage;
  /** The time the document was updated */
  updatedAt: Scalars['DateTime'];
  /** User that last updated this document */
  updatedBy?: Maybe<User>;
};

export type AccountAvatarArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  locales?: InputMaybe<Array<Locale>>;
};

export type AccountCreatedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  locales?: InputMaybe<Array<Locale>>;
};

export type AccountDocumentInStagesArgs = {
  includeCurrent?: Scalars['Boolean'];
  inheritLocale?: Scalars['Boolean'];
  stages?: Array<Stage>;
};

export type AccountExpensesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: InputMaybe<Array<Locale>>;
  orderBy?: InputMaybe<ExpenseOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ExpenseWhereInput>;
};

export type AccountHistoryArgs = {
  limit?: Scalars['Int'];
  skip?: Scalars['Int'];
  stageOverride?: InputMaybe<Stage>;
};

export type AccountPublishedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  locales?: InputMaybe<Array<Locale>>;
};

export type AccountScheduledInArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: InputMaybe<Array<Locale>>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ScheduledOperationWhereInput>;
};

export type AccountUpdatedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  locales?: InputMaybe<Array<Locale>>;
};

export type AccountConnectInput = {
  /** Allow to specify document position in list of connected documents, will default to appending at end of list */
  position?: InputMaybe<ConnectPositionInput>;
  /** Document to connect */
  where: AccountWhereUniqueInput;
};

/** A connection to a list of items. */
export type AccountConnection = {
  __typename?: 'AccountConnection';
  aggregate: Aggregate;
  /** A list of edges. */
  edges: Array<AccountEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

export type AccountCreateInput = {
  avatar?: InputMaybe<AssetCreateOneInlineInput>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  email: Scalars['String'];
  expenses?: InputMaybe<ExpenseCreateManyInlineInput>;
  name: Scalars['String'];
  password: Scalars['String'];
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type AccountCreateManyInlineInput = {
  /** Connect multiple existing Account documents */
  connect?: InputMaybe<Array<AccountWhereUniqueInput>>;
  /** Create and connect multiple existing Account documents */
  create?: InputMaybe<Array<AccountCreateInput>>;
};

export type AccountCreateOneInlineInput = {
  /** Connect one existing Account document */
  connect?: InputMaybe<AccountWhereUniqueInput>;
  /** Create and connect one Account document */
  create?: InputMaybe<AccountCreateInput>;
};

/** An edge in a connection. */
export type AccountEdge = {
  __typename?: 'AccountEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: Account;
};

/** Identifies documents */
export type AccountManyWhereInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<AccountWhereInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<AccountWhereInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<AccountWhereInput>>;
  /** Contains search across all appropriate fields. */
  _search?: InputMaybe<Scalars['String']>;
  avatar?: InputMaybe<AssetWhereInput>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  createdAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  createdAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  createdAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  createdAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  createdAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** Any other value that exists and is not equal to the given value. */
  createdAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  createdAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  createdBy?: InputMaybe<UserWhereInput>;
  documentInStages_every?: InputMaybe<AccountWhereStageInput>;
  documentInStages_none?: InputMaybe<AccountWhereStageInput>;
  documentInStages_some?: InputMaybe<AccountWhereStageInput>;
  email?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  email_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  email_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  email_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Any other value that exists and is not equal to the given value. */
  email_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  email_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  email_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  email_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  email_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  email_starts_with?: InputMaybe<Scalars['String']>;
  expenses_every?: InputMaybe<ExpenseWhereInput>;
  expenses_none?: InputMaybe<ExpenseWhereInput>;
  expenses_some?: InputMaybe<ExpenseWhereInput>;
  id?: InputMaybe<Scalars['ID']>;
  /** All values containing the given string. */
  id_contains?: InputMaybe<Scalars['ID']>;
  /** All values ending with the given string. */
  id_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are contained in given list. */
  id_in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Any other value that exists and is not equal to the given value. */
  id_not?: InputMaybe<Scalars['ID']>;
  /** All values not containing the given string. */
  id_not_contains?: InputMaybe<Scalars['ID']>;
  /** All values not ending with the given string */
  id_not_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are not contained in given list. */
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** All values not starting with the given string. */
  id_not_starts_with?: InputMaybe<Scalars['ID']>;
  /** All values starting with the given string. */
  id_starts_with?: InputMaybe<Scalars['ID']>;
  name?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  name_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  name_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  name_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Any other value that exists and is not equal to the given value. */
  name_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  name_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  name_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  name_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  name_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  name_starts_with?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  password_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  password_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  password_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Any other value that exists and is not equal to the given value. */
  password_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  password_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  password_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  password_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  password_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  password_starts_with?: InputMaybe<Scalars['String']>;
  publishedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  publishedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  publishedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  publishedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  publishedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  publishedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** Any other value that exists and is not equal to the given value. */
  publishedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  publishedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  publishedBy?: InputMaybe<UserWhereInput>;
  scheduledIn_every?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_none?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_some?: InputMaybe<ScheduledOperationWhereInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  updatedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  updatedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  updatedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  updatedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  updatedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** Any other value that exists and is not equal to the given value. */
  updatedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  updatedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  updatedBy?: InputMaybe<UserWhereInput>;
};

export enum AccountOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  EmailAsc = 'email_ASC',
  EmailDesc = 'email_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  NameAsc = 'name_ASC',
  NameDesc = 'name_DESC',
  PasswordAsc = 'password_ASC',
  PasswordDesc = 'password_DESC',
  PublishedAtAsc = 'publishedAt_ASC',
  PublishedAtDesc = 'publishedAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
}

export type AccountUpdateInput = {
  avatar?: InputMaybe<AssetUpdateOneInlineInput>;
  email?: InputMaybe<Scalars['String']>;
  expenses?: InputMaybe<ExpenseUpdateManyInlineInput>;
  name?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
};

export type AccountUpdateManyInlineInput = {
  /** Connect multiple existing Account documents */
  connect?: InputMaybe<Array<AccountConnectInput>>;
  /** Create and connect multiple Account documents */
  create?: InputMaybe<Array<AccountCreateInput>>;
  /** Delete multiple Account documents */
  delete?: InputMaybe<Array<AccountWhereUniqueInput>>;
  /** Disconnect multiple Account documents */
  disconnect?: InputMaybe<Array<AccountWhereUniqueInput>>;
  /** Override currently-connected documents with multiple existing Account documents */
  set?: InputMaybe<Array<AccountWhereUniqueInput>>;
  /** Update multiple Account documents */
  update?: InputMaybe<Array<AccountUpdateWithNestedWhereUniqueInput>>;
  /** Upsert multiple Account documents */
  upsert?: InputMaybe<Array<AccountUpsertWithNestedWhereUniqueInput>>;
};

export type AccountUpdateManyInput = {
  name?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
};

export type AccountUpdateManyWithNestedWhereInput = {
  /** Update many input */
  data: AccountUpdateManyInput;
  /** Document search */
  where: AccountWhereInput;
};

export type AccountUpdateOneInlineInput = {
  /** Connect existing Account document */
  connect?: InputMaybe<AccountWhereUniqueInput>;
  /** Create and connect one Account document */
  create?: InputMaybe<AccountCreateInput>;
  /** Delete currently connected Account document */
  delete?: InputMaybe<Scalars['Boolean']>;
  /** Disconnect currently connected Account document */
  disconnect?: InputMaybe<Scalars['Boolean']>;
  /** Update single Account document */
  update?: InputMaybe<AccountUpdateWithNestedWhereUniqueInput>;
  /** Upsert single Account document */
  upsert?: InputMaybe<AccountUpsertWithNestedWhereUniqueInput>;
};

export type AccountUpdateWithNestedWhereUniqueInput = {
  /** Document to update */
  data: AccountUpdateInput;
  /** Unique document search */
  where: AccountWhereUniqueInput;
};

export type AccountUpsertInput = {
  /** Create document if it didn't exist */
  create: AccountCreateInput;
  /** Update document if it exists */
  update: AccountUpdateInput;
};

export type AccountUpsertWithNestedWhereUniqueInput = {
  /** Upsert data */
  data: AccountUpsertInput;
  /** Unique document search */
  where: AccountWhereUniqueInput;
};

/** This contains a set of filters that can be used to compare values internally */
export type AccountWhereComparatorInput = {
  /** This field can be used to request to check if the entry is outdated by internal comparison */
  outdated_to?: InputMaybe<Scalars['Boolean']>;
};

/** Identifies documents */
export type AccountWhereInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<AccountWhereInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<AccountWhereInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<AccountWhereInput>>;
  /** Contains search across all appropriate fields. */
  _search?: InputMaybe<Scalars['String']>;
  avatar?: InputMaybe<AssetWhereInput>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  createdAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  createdAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  createdAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  createdAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  createdAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** Any other value that exists and is not equal to the given value. */
  createdAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  createdAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  createdBy?: InputMaybe<UserWhereInput>;
  documentInStages_every?: InputMaybe<AccountWhereStageInput>;
  documentInStages_none?: InputMaybe<AccountWhereStageInput>;
  documentInStages_some?: InputMaybe<AccountWhereStageInput>;
  email?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  email_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  email_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  email_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Any other value that exists and is not equal to the given value. */
  email_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  email_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  email_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  email_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  email_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  email_starts_with?: InputMaybe<Scalars['String']>;
  expenses_every?: InputMaybe<ExpenseWhereInput>;
  expenses_none?: InputMaybe<ExpenseWhereInput>;
  expenses_some?: InputMaybe<ExpenseWhereInput>;
  id?: InputMaybe<Scalars['ID']>;
  /** All values containing the given string. */
  id_contains?: InputMaybe<Scalars['ID']>;
  /** All values ending with the given string. */
  id_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are contained in given list. */
  id_in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Any other value that exists and is not equal to the given value. */
  id_not?: InputMaybe<Scalars['ID']>;
  /** All values not containing the given string. */
  id_not_contains?: InputMaybe<Scalars['ID']>;
  /** All values not ending with the given string */
  id_not_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are not contained in given list. */
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** All values not starting with the given string. */
  id_not_starts_with?: InputMaybe<Scalars['ID']>;
  /** All values starting with the given string. */
  id_starts_with?: InputMaybe<Scalars['ID']>;
  name?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  name_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  name_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  name_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Any other value that exists and is not equal to the given value. */
  name_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  name_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  name_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  name_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  name_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  name_starts_with?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  password_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  password_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  password_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Any other value that exists and is not equal to the given value. */
  password_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  password_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  password_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  password_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  password_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  password_starts_with?: InputMaybe<Scalars['String']>;
  publishedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  publishedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  publishedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  publishedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  publishedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  publishedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** Any other value that exists and is not equal to the given value. */
  publishedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  publishedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  publishedBy?: InputMaybe<UserWhereInput>;
  scheduledIn_every?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_none?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_some?: InputMaybe<ScheduledOperationWhereInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  updatedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  updatedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  updatedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  updatedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  updatedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** Any other value that exists and is not equal to the given value. */
  updatedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  updatedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  updatedBy?: InputMaybe<UserWhereInput>;
};

/** The document in stages filter allows specifying a stage entry to cross compare the same document between different stages */
export type AccountWhereStageInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<AccountWhereStageInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<AccountWhereStageInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<AccountWhereStageInput>>;
  /** This field contains fields which can be set as true or false to specify an internal comparison */
  compareWithParent?: InputMaybe<AccountWhereComparatorInput>;
  /** Specify the stage to compare with */
  stage?: InputMaybe<Stage>;
};

/** References Account record uniquely */
export type AccountWhereUniqueInput = {
  email?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
};

export type Aggregate = {
  __typename?: 'Aggregate';
  count: Scalars['Int'];
};

/** Asset system model */
export type Asset = Node & {
  __typename?: 'Asset';
  avatarAccount: Array<Account>;
  /** The time the document was created */
  createdAt: Scalars['DateTime'];
  /** User that created this document */
  createdBy?: Maybe<User>;
  /** Get the document in other stages */
  documentInStages: Array<Asset>;
  /** The file name */
  fileName: Scalars['String'];
  /** The file handle */
  handle: Scalars['String'];
  /** The height of the file */
  height?: Maybe<Scalars['Float']>;
  /** List of Asset versions */
  history: Array<Version>;
  /** The unique identifier */
  id: Scalars['ID'];
  /** System Locale field */
  locale: Locale;
  /** Get the other localizations for this document */
  localizations: Array<Asset>;
  /** The mime type of the file */
  mimeType?: Maybe<Scalars['String']>;
  /** The time the document was published. Null on documents in draft stage. */
  publishedAt?: Maybe<Scalars['DateTime']>;
  /** User that last published this document */
  publishedBy?: Maybe<User>;
  scheduledIn: Array<ScheduledOperation>;
  /** The file size */
  size?: Maybe<Scalars['Float']>;
  /** System stage field */
  stage: Stage;
  /** The time the document was updated */
  updatedAt: Scalars['DateTime'];
  /** User that last updated this document */
  updatedBy?: Maybe<User>;
  /** Get the url for the asset with provided transformations applied. */
  url: Scalars['String'];
  /** The file width */
  width?: Maybe<Scalars['Float']>;
};

/** Asset system model */
export type AssetAvatarAccountArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: InputMaybe<Array<Locale>>;
  orderBy?: InputMaybe<AccountOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<AccountWhereInput>;
};

/** Asset system model */
export type AssetCreatedAtArgs = {
  variation?: SystemDateTimeFieldVariation;
};

/** Asset system model */
export type AssetCreatedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  locales?: InputMaybe<Array<Locale>>;
};

/** Asset system model */
export type AssetDocumentInStagesArgs = {
  includeCurrent?: Scalars['Boolean'];
  inheritLocale?: Scalars['Boolean'];
  stages?: Array<Stage>;
};

/** Asset system model */
export type AssetHistoryArgs = {
  limit?: Scalars['Int'];
  skip?: Scalars['Int'];
  stageOverride?: InputMaybe<Stage>;
};

/** Asset system model */
export type AssetLocalizationsArgs = {
  includeCurrent?: Scalars['Boolean'];
  locales?: Array<Locale>;
};

/** Asset system model */
export type AssetPublishedAtArgs = {
  variation?: SystemDateTimeFieldVariation;
};

/** Asset system model */
export type AssetPublishedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  locales?: InputMaybe<Array<Locale>>;
};

/** Asset system model */
export type AssetScheduledInArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: InputMaybe<Array<Locale>>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ScheduledOperationWhereInput>;
};

/** Asset system model */
export type AssetUpdatedAtArgs = {
  variation?: SystemDateTimeFieldVariation;
};

/** Asset system model */
export type AssetUpdatedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  locales?: InputMaybe<Array<Locale>>;
};

/** Asset system model */
export type AssetUrlArgs = {
  transformation?: InputMaybe<AssetTransformationInput>;
};

export type AssetConnectInput = {
  /** Allow to specify document position in list of connected documents, will default to appending at end of list */
  position?: InputMaybe<ConnectPositionInput>;
  /** Document to connect */
  where: AssetWhereUniqueInput;
};

/** A connection to a list of items. */
export type AssetConnection = {
  __typename?: 'AssetConnection';
  aggregate: Aggregate;
  /** A list of edges. */
  edges: Array<AssetEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

export type AssetCreateInput = {
  avatarAccount?: InputMaybe<AccountCreateManyInlineInput>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  fileName: Scalars['String'];
  handle: Scalars['String'];
  height?: InputMaybe<Scalars['Float']>;
  /** Inline mutations for managing document localizations excluding the default locale */
  localizations?: InputMaybe<AssetCreateLocalizationsInput>;
  mimeType?: InputMaybe<Scalars['String']>;
  size?: InputMaybe<Scalars['Float']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  width?: InputMaybe<Scalars['Float']>;
};

export type AssetCreateLocalizationDataInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  fileName: Scalars['String'];
  handle: Scalars['String'];
  height?: InputMaybe<Scalars['Float']>;
  mimeType?: InputMaybe<Scalars['String']>;
  size?: InputMaybe<Scalars['Float']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  width?: InputMaybe<Scalars['Float']>;
};

export type AssetCreateLocalizationInput = {
  /** Localization input */
  data: AssetCreateLocalizationDataInput;
  locale: Locale;
};

export type AssetCreateLocalizationsInput = {
  /** Create localizations for the newly-created document */
  create?: InputMaybe<Array<AssetCreateLocalizationInput>>;
};

export type AssetCreateManyInlineInput = {
  /** Connect multiple existing Asset documents */
  connect?: InputMaybe<Array<AssetWhereUniqueInput>>;
  /** Create and connect multiple existing Asset documents */
  create?: InputMaybe<Array<AssetCreateInput>>;
};

export type AssetCreateOneInlineInput = {
  /** Connect one existing Asset document */
  connect?: InputMaybe<AssetWhereUniqueInput>;
  /** Create and connect one Asset document */
  create?: InputMaybe<AssetCreateInput>;
};

/** An edge in a connection. */
export type AssetEdge = {
  __typename?: 'AssetEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: Asset;
};

/** Identifies documents */
export type AssetManyWhereInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<AssetWhereInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<AssetWhereInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<AssetWhereInput>>;
  /** Contains search across all appropriate fields. */
  _search?: InputMaybe<Scalars['String']>;
  avatarAccount_every?: InputMaybe<AccountWhereInput>;
  avatarAccount_none?: InputMaybe<AccountWhereInput>;
  avatarAccount_some?: InputMaybe<AccountWhereInput>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  createdAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  createdAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  createdAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  createdAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  createdAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** Any other value that exists and is not equal to the given value. */
  createdAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  createdAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  createdBy?: InputMaybe<UserWhereInput>;
  documentInStages_every?: InputMaybe<AssetWhereStageInput>;
  documentInStages_none?: InputMaybe<AssetWhereStageInput>;
  documentInStages_some?: InputMaybe<AssetWhereStageInput>;
  id?: InputMaybe<Scalars['ID']>;
  /** All values containing the given string. */
  id_contains?: InputMaybe<Scalars['ID']>;
  /** All values ending with the given string. */
  id_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are contained in given list. */
  id_in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Any other value that exists and is not equal to the given value. */
  id_not?: InputMaybe<Scalars['ID']>;
  /** All values not containing the given string. */
  id_not_contains?: InputMaybe<Scalars['ID']>;
  /** All values not ending with the given string */
  id_not_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are not contained in given list. */
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** All values not starting with the given string. */
  id_not_starts_with?: InputMaybe<Scalars['ID']>;
  /** All values starting with the given string. */
  id_starts_with?: InputMaybe<Scalars['ID']>;
  publishedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  publishedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  publishedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  publishedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  publishedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  publishedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** Any other value that exists and is not equal to the given value. */
  publishedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  publishedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  publishedBy?: InputMaybe<UserWhereInput>;
  scheduledIn_every?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_none?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_some?: InputMaybe<ScheduledOperationWhereInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  updatedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  updatedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  updatedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  updatedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  updatedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** Any other value that exists and is not equal to the given value. */
  updatedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  updatedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  updatedBy?: InputMaybe<UserWhereInput>;
};

export enum AssetOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  FileNameAsc = 'fileName_ASC',
  FileNameDesc = 'fileName_DESC',
  HandleAsc = 'handle_ASC',
  HandleDesc = 'handle_DESC',
  HeightAsc = 'height_ASC',
  HeightDesc = 'height_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  MimeTypeAsc = 'mimeType_ASC',
  MimeTypeDesc = 'mimeType_DESC',
  PublishedAtAsc = 'publishedAt_ASC',
  PublishedAtDesc = 'publishedAt_DESC',
  SizeAsc = 'size_ASC',
  SizeDesc = 'size_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  WidthAsc = 'width_ASC',
  WidthDesc = 'width_DESC',
}

/** Transformations for Assets */
export type AssetTransformationInput = {
  document?: InputMaybe<DocumentTransformationInput>;
  image?: InputMaybe<ImageTransformationInput>;
  /** Pass true if you want to validate the passed transformation parameters */
  validateOptions?: InputMaybe<Scalars['Boolean']>;
};

export type AssetUpdateInput = {
  avatarAccount?: InputMaybe<AccountUpdateManyInlineInput>;
  fileName?: InputMaybe<Scalars['String']>;
  handle?: InputMaybe<Scalars['String']>;
  height?: InputMaybe<Scalars['Float']>;
  /** Manage document localizations */
  localizations?: InputMaybe<AssetUpdateLocalizationsInput>;
  mimeType?: InputMaybe<Scalars['String']>;
  size?: InputMaybe<Scalars['Float']>;
  width?: InputMaybe<Scalars['Float']>;
};

export type AssetUpdateLocalizationDataInput = {
  fileName?: InputMaybe<Scalars['String']>;
  handle?: InputMaybe<Scalars['String']>;
  height?: InputMaybe<Scalars['Float']>;
  mimeType?: InputMaybe<Scalars['String']>;
  size?: InputMaybe<Scalars['Float']>;
  width?: InputMaybe<Scalars['Float']>;
};

export type AssetUpdateLocalizationInput = {
  data: AssetUpdateLocalizationDataInput;
  locale: Locale;
};

export type AssetUpdateLocalizationsInput = {
  /** Localizations to create */
  create?: InputMaybe<Array<AssetCreateLocalizationInput>>;
  /** Localizations to delete */
  delete?: InputMaybe<Array<Locale>>;
  /** Localizations to update */
  update?: InputMaybe<Array<AssetUpdateLocalizationInput>>;
  upsert?: InputMaybe<Array<AssetUpsertLocalizationInput>>;
};

export type AssetUpdateManyInlineInput = {
  /** Connect multiple existing Asset documents */
  connect?: InputMaybe<Array<AssetConnectInput>>;
  /** Create and connect multiple Asset documents */
  create?: InputMaybe<Array<AssetCreateInput>>;
  /** Delete multiple Asset documents */
  delete?: InputMaybe<Array<AssetWhereUniqueInput>>;
  /** Disconnect multiple Asset documents */
  disconnect?: InputMaybe<Array<AssetWhereUniqueInput>>;
  /** Override currently-connected documents with multiple existing Asset documents */
  set?: InputMaybe<Array<AssetWhereUniqueInput>>;
  /** Update multiple Asset documents */
  update?: InputMaybe<Array<AssetUpdateWithNestedWhereUniqueInput>>;
  /** Upsert multiple Asset documents */
  upsert?: InputMaybe<Array<AssetUpsertWithNestedWhereUniqueInput>>;
};

export type AssetUpdateManyInput = {
  fileName?: InputMaybe<Scalars['String']>;
  height?: InputMaybe<Scalars['Float']>;
  /** Optional updates to localizations */
  localizations?: InputMaybe<AssetUpdateManyLocalizationsInput>;
  mimeType?: InputMaybe<Scalars['String']>;
  size?: InputMaybe<Scalars['Float']>;
  width?: InputMaybe<Scalars['Float']>;
};

export type AssetUpdateManyLocalizationDataInput = {
  fileName?: InputMaybe<Scalars['String']>;
  height?: InputMaybe<Scalars['Float']>;
  mimeType?: InputMaybe<Scalars['String']>;
  size?: InputMaybe<Scalars['Float']>;
  width?: InputMaybe<Scalars['Float']>;
};

export type AssetUpdateManyLocalizationInput = {
  data: AssetUpdateManyLocalizationDataInput;
  locale: Locale;
};

export type AssetUpdateManyLocalizationsInput = {
  /** Localizations to update */
  update?: InputMaybe<Array<AssetUpdateManyLocalizationInput>>;
};

export type AssetUpdateManyWithNestedWhereInput = {
  /** Update many input */
  data: AssetUpdateManyInput;
  /** Document search */
  where: AssetWhereInput;
};

export type AssetUpdateOneInlineInput = {
  /** Connect existing Asset document */
  connect?: InputMaybe<AssetWhereUniqueInput>;
  /** Create and connect one Asset document */
  create?: InputMaybe<AssetCreateInput>;
  /** Delete currently connected Asset document */
  delete?: InputMaybe<Scalars['Boolean']>;
  /** Disconnect currently connected Asset document */
  disconnect?: InputMaybe<Scalars['Boolean']>;
  /** Update single Asset document */
  update?: InputMaybe<AssetUpdateWithNestedWhereUniqueInput>;
  /** Upsert single Asset document */
  upsert?: InputMaybe<AssetUpsertWithNestedWhereUniqueInput>;
};

export type AssetUpdateWithNestedWhereUniqueInput = {
  /** Document to update */
  data: AssetUpdateInput;
  /** Unique document search */
  where: AssetWhereUniqueInput;
};

export type AssetUpsertInput = {
  /** Create document if it didn't exist */
  create: AssetCreateInput;
  /** Update document if it exists */
  update: AssetUpdateInput;
};

export type AssetUpsertLocalizationInput = {
  create: AssetCreateLocalizationDataInput;
  locale: Locale;
  update: AssetUpdateLocalizationDataInput;
};

export type AssetUpsertWithNestedWhereUniqueInput = {
  /** Upsert data */
  data: AssetUpsertInput;
  /** Unique document search */
  where: AssetWhereUniqueInput;
};

/** This contains a set of filters that can be used to compare values internally */
export type AssetWhereComparatorInput = {
  /** This field can be used to request to check if the entry is outdated by internal comparison */
  outdated_to?: InputMaybe<Scalars['Boolean']>;
};

/** Identifies documents */
export type AssetWhereInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<AssetWhereInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<AssetWhereInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<AssetWhereInput>>;
  /** Contains search across all appropriate fields. */
  _search?: InputMaybe<Scalars['String']>;
  avatarAccount_every?: InputMaybe<AccountWhereInput>;
  avatarAccount_none?: InputMaybe<AccountWhereInput>;
  avatarAccount_some?: InputMaybe<AccountWhereInput>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  createdAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  createdAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  createdAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  createdAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  createdAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** Any other value that exists and is not equal to the given value. */
  createdAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  createdAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  createdBy?: InputMaybe<UserWhereInput>;
  documentInStages_every?: InputMaybe<AssetWhereStageInput>;
  documentInStages_none?: InputMaybe<AssetWhereStageInput>;
  documentInStages_some?: InputMaybe<AssetWhereStageInput>;
  fileName?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  fileName_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  fileName_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  fileName_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Any other value that exists and is not equal to the given value. */
  fileName_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  fileName_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  fileName_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  fileName_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  fileName_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  fileName_starts_with?: InputMaybe<Scalars['String']>;
  handle?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  handle_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  handle_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  handle_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Any other value that exists and is not equal to the given value. */
  handle_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  handle_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  handle_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  handle_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  handle_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  handle_starts_with?: InputMaybe<Scalars['String']>;
  height?: InputMaybe<Scalars['Float']>;
  /** All values greater than the given value. */
  height_gt?: InputMaybe<Scalars['Float']>;
  /** All values greater than or equal the given value. */
  height_gte?: InputMaybe<Scalars['Float']>;
  /** All values that are contained in given list. */
  height_in?: InputMaybe<Array<InputMaybe<Scalars['Float']>>>;
  /** All values less than the given value. */
  height_lt?: InputMaybe<Scalars['Float']>;
  /** All values less than or equal the given value. */
  height_lte?: InputMaybe<Scalars['Float']>;
  /** Any other value that exists and is not equal to the given value. */
  height_not?: InputMaybe<Scalars['Float']>;
  /** All values that are not contained in given list. */
  height_not_in?: InputMaybe<Array<InputMaybe<Scalars['Float']>>>;
  id?: InputMaybe<Scalars['ID']>;
  /** All values containing the given string. */
  id_contains?: InputMaybe<Scalars['ID']>;
  /** All values ending with the given string. */
  id_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are contained in given list. */
  id_in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Any other value that exists and is not equal to the given value. */
  id_not?: InputMaybe<Scalars['ID']>;
  /** All values not containing the given string. */
  id_not_contains?: InputMaybe<Scalars['ID']>;
  /** All values not ending with the given string */
  id_not_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are not contained in given list. */
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** All values not starting with the given string. */
  id_not_starts_with?: InputMaybe<Scalars['ID']>;
  /** All values starting with the given string. */
  id_starts_with?: InputMaybe<Scalars['ID']>;
  mimeType?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  mimeType_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  mimeType_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  mimeType_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Any other value that exists and is not equal to the given value. */
  mimeType_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  mimeType_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  mimeType_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  mimeType_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  mimeType_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  mimeType_starts_with?: InputMaybe<Scalars['String']>;
  publishedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  publishedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  publishedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  publishedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  publishedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  publishedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** Any other value that exists and is not equal to the given value. */
  publishedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  publishedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  publishedBy?: InputMaybe<UserWhereInput>;
  scheduledIn_every?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_none?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_some?: InputMaybe<ScheduledOperationWhereInput>;
  size?: InputMaybe<Scalars['Float']>;
  /** All values greater than the given value. */
  size_gt?: InputMaybe<Scalars['Float']>;
  /** All values greater than or equal the given value. */
  size_gte?: InputMaybe<Scalars['Float']>;
  /** All values that are contained in given list. */
  size_in?: InputMaybe<Array<InputMaybe<Scalars['Float']>>>;
  /** All values less than the given value. */
  size_lt?: InputMaybe<Scalars['Float']>;
  /** All values less than or equal the given value. */
  size_lte?: InputMaybe<Scalars['Float']>;
  /** Any other value that exists and is not equal to the given value. */
  size_not?: InputMaybe<Scalars['Float']>;
  /** All values that are not contained in given list. */
  size_not_in?: InputMaybe<Array<InputMaybe<Scalars['Float']>>>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  updatedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  updatedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  updatedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  updatedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  updatedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** Any other value that exists and is not equal to the given value. */
  updatedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  updatedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  updatedBy?: InputMaybe<UserWhereInput>;
  width?: InputMaybe<Scalars['Float']>;
  /** All values greater than the given value. */
  width_gt?: InputMaybe<Scalars['Float']>;
  /** All values greater than or equal the given value. */
  width_gte?: InputMaybe<Scalars['Float']>;
  /** All values that are contained in given list. */
  width_in?: InputMaybe<Array<InputMaybe<Scalars['Float']>>>;
  /** All values less than the given value. */
  width_lt?: InputMaybe<Scalars['Float']>;
  /** All values less than or equal the given value. */
  width_lte?: InputMaybe<Scalars['Float']>;
  /** Any other value that exists and is not equal to the given value. */
  width_not?: InputMaybe<Scalars['Float']>;
  /** All values that are not contained in given list. */
  width_not_in?: InputMaybe<Array<InputMaybe<Scalars['Float']>>>;
};

/** The document in stages filter allows specifying a stage entry to cross compare the same document between different stages */
export type AssetWhereStageInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<AssetWhereStageInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<AssetWhereStageInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<AssetWhereStageInput>>;
  /** This field contains fields which can be set as true or false to specify an internal comparison */
  compareWithParent?: InputMaybe<AssetWhereComparatorInput>;
  /** Specify the stage to compare with */
  stage?: InputMaybe<Stage>;
};

/** References Asset record uniquely */
export type AssetWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']>;
};

export type BatchPayload = {
  __typename?: 'BatchPayload';
  /** The number of nodes that have been affected by the Batch operation. */
  count: Scalars['Long'];
};

export type Category = Node & {
  __typename?: 'Category';
  /** The time the document was created */
  createdAt: Scalars['DateTime'];
  /** User that created this document */
  createdBy?: Maybe<User>;
  /** Get the document in other stages */
  documentInStages: Array<Category>;
  /** List of Category versions */
  history: Array<Version>;
  /** The unique identifier */
  id: Scalars['ID'];
  name: Scalars['String'];
  /** The time the document was published. Null on documents in draft stage. */
  publishedAt?: Maybe<Scalars['DateTime']>;
  /** User that last published this document */
  publishedBy?: Maybe<User>;
  scheduledIn: Array<ScheduledOperation>;
  /** System stage field */
  stage: Stage;
  type: Scalars['String'];
  /** The time the document was updated */
  updatedAt: Scalars['DateTime'];
  /** User that last updated this document */
  updatedBy?: Maybe<User>;
};

export type CategoryCreatedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  locales?: InputMaybe<Array<Locale>>;
};

export type CategoryDocumentInStagesArgs = {
  includeCurrent?: Scalars['Boolean'];
  inheritLocale?: Scalars['Boolean'];
  stages?: Array<Stage>;
};

export type CategoryHistoryArgs = {
  limit?: Scalars['Int'];
  skip?: Scalars['Int'];
  stageOverride?: InputMaybe<Stage>;
};

export type CategoryPublishedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  locales?: InputMaybe<Array<Locale>>;
};

export type CategoryScheduledInArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: InputMaybe<Array<Locale>>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ScheduledOperationWhereInput>;
};

export type CategoryUpdatedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  locales?: InputMaybe<Array<Locale>>;
};

export type CategoryConnectInput = {
  /** Allow to specify document position in list of connected documents, will default to appending at end of list */
  position?: InputMaybe<ConnectPositionInput>;
  /** Document to connect */
  where: CategoryWhereUniqueInput;
};

/** A connection to a list of items. */
export type CategoryConnection = {
  __typename?: 'CategoryConnection';
  aggregate: Aggregate;
  /** A list of edges. */
  edges: Array<CategoryEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

export type CategoryCreateInput = {
  clapu9t6d5lss01ujhpn5687u?: InputMaybe<ExpenseCreateManyInlineInput>;
  clezrxfau1c1n01ugcncb60gf?: InputMaybe<WishCreateManyInlineInput>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  name: Scalars['String'];
  type: Scalars['String'];
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type CategoryCreateManyInlineInput = {
  /** Connect multiple existing Category documents */
  connect?: InputMaybe<Array<CategoryWhereUniqueInput>>;
  /** Create and connect multiple existing Category documents */
  create?: InputMaybe<Array<CategoryCreateInput>>;
};

export type CategoryCreateOneInlineInput = {
  /** Connect one existing Category document */
  connect?: InputMaybe<CategoryWhereUniqueInput>;
  /** Create and connect one Category document */
  create?: InputMaybe<CategoryCreateInput>;
};

/** An edge in a connection. */
export type CategoryEdge = {
  __typename?: 'CategoryEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: Category;
};

/** Identifies documents */
export type CategoryManyWhereInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<CategoryWhereInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<CategoryWhereInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<CategoryWhereInput>>;
  /** Contains search across all appropriate fields. */
  _search?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  createdAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  createdAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  createdAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  createdAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  createdAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** Any other value that exists and is not equal to the given value. */
  createdAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  createdAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  createdBy?: InputMaybe<UserWhereInput>;
  documentInStages_every?: InputMaybe<CategoryWhereStageInput>;
  documentInStages_none?: InputMaybe<CategoryWhereStageInput>;
  documentInStages_some?: InputMaybe<CategoryWhereStageInput>;
  id?: InputMaybe<Scalars['ID']>;
  /** All values containing the given string. */
  id_contains?: InputMaybe<Scalars['ID']>;
  /** All values ending with the given string. */
  id_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are contained in given list. */
  id_in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Any other value that exists and is not equal to the given value. */
  id_not?: InputMaybe<Scalars['ID']>;
  /** All values not containing the given string. */
  id_not_contains?: InputMaybe<Scalars['ID']>;
  /** All values not ending with the given string */
  id_not_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are not contained in given list. */
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** All values not starting with the given string. */
  id_not_starts_with?: InputMaybe<Scalars['ID']>;
  /** All values starting with the given string. */
  id_starts_with?: InputMaybe<Scalars['ID']>;
  name?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  name_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  name_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  name_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Any other value that exists and is not equal to the given value. */
  name_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  name_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  name_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  name_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  name_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  name_starts_with?: InputMaybe<Scalars['String']>;
  publishedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  publishedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  publishedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  publishedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  publishedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  publishedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** Any other value that exists and is not equal to the given value. */
  publishedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  publishedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  publishedBy?: InputMaybe<UserWhereInput>;
  scheduledIn_every?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_none?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_some?: InputMaybe<ScheduledOperationWhereInput>;
  type?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  type_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  type_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  type_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Any other value that exists and is not equal to the given value. */
  type_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  type_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  type_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  type_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  type_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  type_starts_with?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  updatedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  updatedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  updatedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  updatedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  updatedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** Any other value that exists and is not equal to the given value. */
  updatedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  updatedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  updatedBy?: InputMaybe<UserWhereInput>;
};

export enum CategoryOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  NameAsc = 'name_ASC',
  NameDesc = 'name_DESC',
  PublishedAtAsc = 'publishedAt_ASC',
  PublishedAtDesc = 'publishedAt_DESC',
  TypeAsc = 'type_ASC',
  TypeDesc = 'type_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
}

export type CategoryUpdateInput = {
  clapu9t6d5lss01ujhpn5687u?: InputMaybe<ExpenseUpdateManyInlineInput>;
  clezrxfau1c1n01ugcncb60gf?: InputMaybe<WishUpdateManyInlineInput>;
  name?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
};

export type CategoryUpdateManyInlineInput = {
  /** Connect multiple existing Category documents */
  connect?: InputMaybe<Array<CategoryConnectInput>>;
  /** Create and connect multiple Category documents */
  create?: InputMaybe<Array<CategoryCreateInput>>;
  /** Delete multiple Category documents */
  delete?: InputMaybe<Array<CategoryWhereUniqueInput>>;
  /** Disconnect multiple Category documents */
  disconnect?: InputMaybe<Array<CategoryWhereUniqueInput>>;
  /** Override currently-connected documents with multiple existing Category documents */
  set?: InputMaybe<Array<CategoryWhereUniqueInput>>;
  /** Update multiple Category documents */
  update?: InputMaybe<Array<CategoryUpdateWithNestedWhereUniqueInput>>;
  /** Upsert multiple Category documents */
  upsert?: InputMaybe<Array<CategoryUpsertWithNestedWhereUniqueInput>>;
};

export type CategoryUpdateManyInput = {
  name?: InputMaybe<Scalars['String']>;
};

export type CategoryUpdateManyWithNestedWhereInput = {
  /** Update many input */
  data: CategoryUpdateManyInput;
  /** Document search */
  where: CategoryWhereInput;
};

export type CategoryUpdateOneInlineInput = {
  /** Connect existing Category document */
  connect?: InputMaybe<CategoryWhereUniqueInput>;
  /** Create and connect one Category document */
  create?: InputMaybe<CategoryCreateInput>;
  /** Delete currently connected Category document */
  delete?: InputMaybe<Scalars['Boolean']>;
  /** Disconnect currently connected Category document */
  disconnect?: InputMaybe<Scalars['Boolean']>;
  /** Update single Category document */
  update?: InputMaybe<CategoryUpdateWithNestedWhereUniqueInput>;
  /** Upsert single Category document */
  upsert?: InputMaybe<CategoryUpsertWithNestedWhereUniqueInput>;
};

export type CategoryUpdateWithNestedWhereUniqueInput = {
  /** Document to update */
  data: CategoryUpdateInput;
  /** Unique document search */
  where: CategoryWhereUniqueInput;
};

export type CategoryUpsertInput = {
  /** Create document if it didn't exist */
  create: CategoryCreateInput;
  /** Update document if it exists */
  update: CategoryUpdateInput;
};

export type CategoryUpsertWithNestedWhereUniqueInput = {
  /** Upsert data */
  data: CategoryUpsertInput;
  /** Unique document search */
  where: CategoryWhereUniqueInput;
};

/** This contains a set of filters that can be used to compare values internally */
export type CategoryWhereComparatorInput = {
  /** This field can be used to request to check if the entry is outdated by internal comparison */
  outdated_to?: InputMaybe<Scalars['Boolean']>;
};

/** Identifies documents */
export type CategoryWhereInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<CategoryWhereInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<CategoryWhereInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<CategoryWhereInput>>;
  /** Contains search across all appropriate fields. */
  _search?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  createdAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  createdAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  createdAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  createdAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  createdAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** Any other value that exists and is not equal to the given value. */
  createdAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  createdAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  createdBy?: InputMaybe<UserWhereInput>;
  documentInStages_every?: InputMaybe<CategoryWhereStageInput>;
  documentInStages_none?: InputMaybe<CategoryWhereStageInput>;
  documentInStages_some?: InputMaybe<CategoryWhereStageInput>;
  id?: InputMaybe<Scalars['ID']>;
  /** All values containing the given string. */
  id_contains?: InputMaybe<Scalars['ID']>;
  /** All values ending with the given string. */
  id_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are contained in given list. */
  id_in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Any other value that exists and is not equal to the given value. */
  id_not?: InputMaybe<Scalars['ID']>;
  /** All values not containing the given string. */
  id_not_contains?: InputMaybe<Scalars['ID']>;
  /** All values not ending with the given string */
  id_not_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are not contained in given list. */
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** All values not starting with the given string. */
  id_not_starts_with?: InputMaybe<Scalars['ID']>;
  /** All values starting with the given string. */
  id_starts_with?: InputMaybe<Scalars['ID']>;
  name?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  name_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  name_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  name_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Any other value that exists and is not equal to the given value. */
  name_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  name_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  name_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  name_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  name_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  name_starts_with?: InputMaybe<Scalars['String']>;
  publishedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  publishedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  publishedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  publishedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  publishedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  publishedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** Any other value that exists and is not equal to the given value. */
  publishedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  publishedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  publishedBy?: InputMaybe<UserWhereInput>;
  scheduledIn_every?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_none?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_some?: InputMaybe<ScheduledOperationWhereInput>;
  type?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  type_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  type_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  type_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Any other value that exists and is not equal to the given value. */
  type_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  type_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  type_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  type_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  type_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  type_starts_with?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  updatedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  updatedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  updatedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  updatedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  updatedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** Any other value that exists and is not equal to the given value. */
  updatedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  updatedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  updatedBy?: InputMaybe<UserWhereInput>;
};

/** The document in stages filter allows specifying a stage entry to cross compare the same document between different stages */
export type CategoryWhereStageInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<CategoryWhereStageInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<CategoryWhereStageInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<CategoryWhereStageInput>>;
  /** This field contains fields which can be set as true or false to specify an internal comparison */
  compareWithParent?: InputMaybe<CategoryWhereComparatorInput>;
  /** Specify the stage to compare with */
  stage?: InputMaybe<Stage>;
};

/** References Category record uniquely */
export type CategoryWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']>;
  type?: InputMaybe<Scalars['String']>;
};

/** Representing a color value comprising of HEX, RGBA and css color values */
export type Color = {
  __typename?: 'Color';
  css: Scalars['String'];
  hex: Scalars['Hex'];
  rgba: Rgba;
};

/** Accepts either HEX or RGBA color value. At least one of hex or rgba value should be passed. If both are passed RGBA is used. */
export type ColorInput = {
  hex?: InputMaybe<Scalars['Hex']>;
  rgba?: InputMaybe<RgbaInput>;
};

export type ConnectPositionInput = {
  /** Connect document after specified document */
  after?: InputMaybe<Scalars['ID']>;
  /** Connect document before specified document */
  before?: InputMaybe<Scalars['ID']>;
  /** Connect document at last position */
  end?: InputMaybe<Scalars['Boolean']>;
  /** Connect document at first position */
  start?: InputMaybe<Scalars['Boolean']>;
};

export enum DocumentFileTypes {
  Doc = 'doc',
  Docx = 'docx',
  Html = 'html',
  Jpg = 'jpg',
  Odp = 'odp',
  Ods = 'ods',
  Odt = 'odt',
  Pdf = 'pdf',
  Png = 'png',
  Ppt = 'ppt',
  Pptx = 'pptx',
  Svg = 'svg',
  Txt = 'txt',
  Webp = 'webp',
  Xls = 'xls',
  Xlsx = 'xlsx',
}

export type DocumentOutputInput = {
  /**
   * Transforms a document into a desired file type.
   * See this matrix for format support:
   *
   * PDF:	jpg, odp, ods, odt, png, svg, txt, and webp
   * DOC:	docx, html, jpg, odt, pdf, png, svg, txt, and webp
   * DOCX:	doc, html, jpg, odt, pdf, png, svg, txt, and webp
   * ODT:	doc, docx, html, jpg, pdf, png, svg, txt, and webp
   * XLS:	jpg, pdf, ods, png, svg, xlsx, and webp
   * XLSX:	jpg, pdf, ods, png, svg, xls, and webp
   * ODS:	jpg, pdf, png, xls, svg, xlsx, and webp
   * PPT:	jpg, odp, pdf, png, svg, pptx, and webp
   * PPTX:	jpg, odp, pdf, png, svg, ppt, and webp
   * ODP:	jpg, pdf, png, ppt, svg, pptx, and webp
   * BMP:	jpg, odp, ods, odt, pdf, png, svg, and webp
   * GIF:	jpg, odp, ods, odt, pdf, png, svg, and webp
   * JPG:	jpg, odp, ods, odt, pdf, png, svg, and webp
   * PNG:	jpg, odp, ods, odt, pdf, png, svg, and webp
   * WEBP:	jpg, odp, ods, odt, pdf, png, svg, and webp
   * TIFF:	jpg, odp, ods, odt, pdf, png, svg, and webp
   * AI:	    jpg, odp, ods, odt, pdf, png, svg, and webp
   * PSD:	jpg, odp, ods, odt, pdf, png, svg, and webp
   * SVG:	jpg, odp, ods, odt, pdf, png, and webp
   * HTML:	jpg, odt, pdf, svg, txt, and webp
   * TXT:	jpg, html, odt, pdf, svg, and webp
   */
  format?: InputMaybe<DocumentFileTypes>;
};

/** Transformations for Documents */
export type DocumentTransformationInput = {
  /** Changes the output for the file. */
  output?: InputMaybe<DocumentOutputInput>;
};

export type DocumentVersion = {
  __typename?: 'DocumentVersion';
  createdAt: Scalars['DateTime'];
  data?: Maybe<Scalars['Json']>;
  id: Scalars['ID'];
  revision: Scalars['Int'];
  stage: Stage;
};

export type Expense = Node & {
  __typename?: 'Expense';
  account?: Maybe<Account>;
  amount: Scalars['Float'];
  card?: Maybe<Scalars['Boolean']>;
  category?: Maybe<Category>;
  /** The time the document was created */
  createdAt: Scalars['DateTime'];
  /** User that created this document */
  createdBy?: Maybe<User>;
  currency: Scalars['String'];
  date?: Maybe<Scalars['Date']>;
  deleted?: Maybe<Scalars['Boolean']>;
  /** Get the document in other stages */
  documentInStages: Array<Expense>;
  /** List of Expense versions */
  history: Array<Version>;
  /** The unique identifier */
  id: Scalars['ID'];
  note?: Maybe<Scalars['String']>;
  payment?: Maybe<Wallet>;
  /** The time the document was published. Null on documents in draft stage. */
  publishedAt?: Maybe<Scalars['DateTime']>;
  /** User that last published this document */
  publishedBy?: Maybe<User>;
  scheduledIn: Array<ScheduledOperation>;
  /** System stage field */
  stage: Stage;
  travel: Scalars['Boolean'];
  /** The time the document was updated */
  updatedAt: Scalars['DateTime'];
  /** User that last updated this document */
  updatedBy?: Maybe<User>;
  variable: Scalars['Boolean'];
};

export type ExpenseAccountArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  locales?: InputMaybe<Array<Locale>>;
};

export type ExpenseCategoryArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  locales?: InputMaybe<Array<Locale>>;
};

export type ExpenseCreatedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  locales?: InputMaybe<Array<Locale>>;
};

export type ExpenseDocumentInStagesArgs = {
  includeCurrent?: Scalars['Boolean'];
  inheritLocale?: Scalars['Boolean'];
  stages?: Array<Stage>;
};

export type ExpenseHistoryArgs = {
  limit?: Scalars['Int'];
  skip?: Scalars['Int'];
  stageOverride?: InputMaybe<Stage>;
};

export type ExpensePaymentArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  locales?: InputMaybe<Array<Locale>>;
};

export type ExpensePublishedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  locales?: InputMaybe<Array<Locale>>;
};

export type ExpenseScheduledInArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: InputMaybe<Array<Locale>>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ScheduledOperationWhereInput>;
};

export type ExpenseUpdatedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  locales?: InputMaybe<Array<Locale>>;
};

export type ExpenseConnectInput = {
  /** Allow to specify document position in list of connected documents, will default to appending at end of list */
  position?: InputMaybe<ConnectPositionInput>;
  /** Document to connect */
  where: ExpenseWhereUniqueInput;
};

/** A connection to a list of items. */
export type ExpenseConnection = {
  __typename?: 'ExpenseConnection';
  aggregate: Aggregate;
  /** A list of edges. */
  edges: Array<ExpenseEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

export type ExpenseCreateInput = {
  account?: InputMaybe<AccountCreateOneInlineInput>;
  amount: Scalars['Float'];
  card?: InputMaybe<Scalars['Boolean']>;
  category?: InputMaybe<CategoryCreateOneInlineInput>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  currency: Scalars['String'];
  date?: InputMaybe<Scalars['Date']>;
  deleted?: InputMaybe<Scalars['Boolean']>;
  note?: InputMaybe<Scalars['String']>;
  payment?: InputMaybe<WalletCreateOneInlineInput>;
  travel: Scalars['Boolean'];
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  variable: Scalars['Boolean'];
};

export type ExpenseCreateManyInlineInput = {
  /** Connect multiple existing Expense documents */
  connect?: InputMaybe<Array<ExpenseWhereUniqueInput>>;
  /** Create and connect multiple existing Expense documents */
  create?: InputMaybe<Array<ExpenseCreateInput>>;
};

export type ExpenseCreateOneInlineInput = {
  /** Connect one existing Expense document */
  connect?: InputMaybe<ExpenseWhereUniqueInput>;
  /** Create and connect one Expense document */
  create?: InputMaybe<ExpenseCreateInput>;
};

/** An edge in a connection. */
export type ExpenseEdge = {
  __typename?: 'ExpenseEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: Expense;
};

/** Identifies documents */
export type ExpenseManyWhereInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<ExpenseWhereInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<ExpenseWhereInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<ExpenseWhereInput>>;
  /** Contains search across all appropriate fields. */
  _search?: InputMaybe<Scalars['String']>;
  account?: InputMaybe<AccountWhereInput>;
  amount?: InputMaybe<Scalars['Float']>;
  /** All values greater than the given value. */
  amount_gt?: InputMaybe<Scalars['Float']>;
  /** All values greater than or equal the given value. */
  amount_gte?: InputMaybe<Scalars['Float']>;
  /** All values that are contained in given list. */
  amount_in?: InputMaybe<Array<InputMaybe<Scalars['Float']>>>;
  /** All values less than the given value. */
  amount_lt?: InputMaybe<Scalars['Float']>;
  /** All values less than or equal the given value. */
  amount_lte?: InputMaybe<Scalars['Float']>;
  /** Any other value that exists and is not equal to the given value. */
  amount_not?: InputMaybe<Scalars['Float']>;
  /** All values that are not contained in given list. */
  amount_not_in?: InputMaybe<Array<InputMaybe<Scalars['Float']>>>;
  card?: InputMaybe<Scalars['Boolean']>;
  /** Any other value that exists and is not equal to the given value. */
  card_not?: InputMaybe<Scalars['Boolean']>;
  category?: InputMaybe<CategoryWhereInput>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  createdAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  createdAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  createdAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  createdAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  createdAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** Any other value that exists and is not equal to the given value. */
  createdAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  createdAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  createdBy?: InputMaybe<UserWhereInput>;
  currency?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  currency_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  currency_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  currency_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Any other value that exists and is not equal to the given value. */
  currency_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  currency_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  currency_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  currency_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  currency_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  currency_starts_with?: InputMaybe<Scalars['String']>;
  date?: InputMaybe<Scalars['Date']>;
  /** All values greater than the given value. */
  date_gt?: InputMaybe<Scalars['Date']>;
  /** All values greater than or equal the given value. */
  date_gte?: InputMaybe<Scalars['Date']>;
  /** All values that are contained in given list. */
  date_in?: InputMaybe<Array<InputMaybe<Scalars['Date']>>>;
  /** All values less than the given value. */
  date_lt?: InputMaybe<Scalars['Date']>;
  /** All values less than or equal the given value. */
  date_lte?: InputMaybe<Scalars['Date']>;
  /** Any other value that exists and is not equal to the given value. */
  date_not?: InputMaybe<Scalars['Date']>;
  /** All values that are not contained in given list. */
  date_not_in?: InputMaybe<Array<InputMaybe<Scalars['Date']>>>;
  deleted?: InputMaybe<Scalars['Boolean']>;
  /** Any other value that exists and is not equal to the given value. */
  deleted_not?: InputMaybe<Scalars['Boolean']>;
  documentInStages_every?: InputMaybe<ExpenseWhereStageInput>;
  documentInStages_none?: InputMaybe<ExpenseWhereStageInput>;
  documentInStages_some?: InputMaybe<ExpenseWhereStageInput>;
  id?: InputMaybe<Scalars['ID']>;
  /** All values containing the given string. */
  id_contains?: InputMaybe<Scalars['ID']>;
  /** All values ending with the given string. */
  id_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are contained in given list. */
  id_in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Any other value that exists and is not equal to the given value. */
  id_not?: InputMaybe<Scalars['ID']>;
  /** All values not containing the given string. */
  id_not_contains?: InputMaybe<Scalars['ID']>;
  /** All values not ending with the given string */
  id_not_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are not contained in given list. */
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** All values not starting with the given string. */
  id_not_starts_with?: InputMaybe<Scalars['ID']>;
  /** All values starting with the given string. */
  id_starts_with?: InputMaybe<Scalars['ID']>;
  note?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  note_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  note_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  note_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Any other value that exists and is not equal to the given value. */
  note_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  note_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  note_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  note_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  note_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  note_starts_with?: InputMaybe<Scalars['String']>;
  payment?: InputMaybe<WalletWhereInput>;
  publishedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  publishedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  publishedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  publishedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  publishedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  publishedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** Any other value that exists and is not equal to the given value. */
  publishedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  publishedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  publishedBy?: InputMaybe<UserWhereInput>;
  scheduledIn_every?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_none?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_some?: InputMaybe<ScheduledOperationWhereInput>;
  travel?: InputMaybe<Scalars['Boolean']>;
  /** Any other value that exists and is not equal to the given value. */
  travel_not?: InputMaybe<Scalars['Boolean']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  updatedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  updatedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  updatedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  updatedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  updatedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** Any other value that exists and is not equal to the given value. */
  updatedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  updatedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  updatedBy?: InputMaybe<UserWhereInput>;
  variable?: InputMaybe<Scalars['Boolean']>;
  /** Any other value that exists and is not equal to the given value. */
  variable_not?: InputMaybe<Scalars['Boolean']>;
};

export enum ExpenseOrderByInput {
  AmountAsc = 'amount_ASC',
  AmountDesc = 'amount_DESC',
  CardAsc = 'card_ASC',
  CardDesc = 'card_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  CurrencyAsc = 'currency_ASC',
  CurrencyDesc = 'currency_DESC',
  DateAsc = 'date_ASC',
  DateDesc = 'date_DESC',
  DeletedAsc = 'deleted_ASC',
  DeletedDesc = 'deleted_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  NoteAsc = 'note_ASC',
  NoteDesc = 'note_DESC',
  PublishedAtAsc = 'publishedAt_ASC',
  PublishedAtDesc = 'publishedAt_DESC',
  TravelAsc = 'travel_ASC',
  TravelDesc = 'travel_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  VariableAsc = 'variable_ASC',
  VariableDesc = 'variable_DESC',
}

export type ExpenseUpdateInput = {
  account?: InputMaybe<AccountUpdateOneInlineInput>;
  amount?: InputMaybe<Scalars['Float']>;
  card?: InputMaybe<Scalars['Boolean']>;
  category?: InputMaybe<CategoryUpdateOneInlineInput>;
  currency?: InputMaybe<Scalars['String']>;
  date?: InputMaybe<Scalars['Date']>;
  deleted?: InputMaybe<Scalars['Boolean']>;
  note?: InputMaybe<Scalars['String']>;
  payment?: InputMaybe<WalletUpdateOneInlineInput>;
  travel?: InputMaybe<Scalars['Boolean']>;
  variable?: InputMaybe<Scalars['Boolean']>;
};

export type ExpenseUpdateManyInlineInput = {
  /** Connect multiple existing Expense documents */
  connect?: InputMaybe<Array<ExpenseConnectInput>>;
  /** Create and connect multiple Expense documents */
  create?: InputMaybe<Array<ExpenseCreateInput>>;
  /** Delete multiple Expense documents */
  delete?: InputMaybe<Array<ExpenseWhereUniqueInput>>;
  /** Disconnect multiple Expense documents */
  disconnect?: InputMaybe<Array<ExpenseWhereUniqueInput>>;
  /** Override currently-connected documents with multiple existing Expense documents */
  set?: InputMaybe<Array<ExpenseWhereUniqueInput>>;
  /** Update multiple Expense documents */
  update?: InputMaybe<Array<ExpenseUpdateWithNestedWhereUniqueInput>>;
  /** Upsert multiple Expense documents */
  upsert?: InputMaybe<Array<ExpenseUpsertWithNestedWhereUniqueInput>>;
};

export type ExpenseUpdateManyInput = {
  amount?: InputMaybe<Scalars['Float']>;
  card?: InputMaybe<Scalars['Boolean']>;
  currency?: InputMaybe<Scalars['String']>;
  date?: InputMaybe<Scalars['Date']>;
  deleted?: InputMaybe<Scalars['Boolean']>;
  note?: InputMaybe<Scalars['String']>;
  travel?: InputMaybe<Scalars['Boolean']>;
  variable?: InputMaybe<Scalars['Boolean']>;
};

export type ExpenseUpdateManyWithNestedWhereInput = {
  /** Update many input */
  data: ExpenseUpdateManyInput;
  /** Document search */
  where: ExpenseWhereInput;
};

export type ExpenseUpdateOneInlineInput = {
  /** Connect existing Expense document */
  connect?: InputMaybe<ExpenseWhereUniqueInput>;
  /** Create and connect one Expense document */
  create?: InputMaybe<ExpenseCreateInput>;
  /** Delete currently connected Expense document */
  delete?: InputMaybe<Scalars['Boolean']>;
  /** Disconnect currently connected Expense document */
  disconnect?: InputMaybe<Scalars['Boolean']>;
  /** Update single Expense document */
  update?: InputMaybe<ExpenseUpdateWithNestedWhereUniqueInput>;
  /** Upsert single Expense document */
  upsert?: InputMaybe<ExpenseUpsertWithNestedWhereUniqueInput>;
};

export type ExpenseUpdateWithNestedWhereUniqueInput = {
  /** Document to update */
  data: ExpenseUpdateInput;
  /** Unique document search */
  where: ExpenseWhereUniqueInput;
};

export type ExpenseUpsertInput = {
  /** Create document if it didn't exist */
  create: ExpenseCreateInput;
  /** Update document if it exists */
  update: ExpenseUpdateInput;
};

export type ExpenseUpsertWithNestedWhereUniqueInput = {
  /** Upsert data */
  data: ExpenseUpsertInput;
  /** Unique document search */
  where: ExpenseWhereUniqueInput;
};

/** This contains a set of filters that can be used to compare values internally */
export type ExpenseWhereComparatorInput = {
  /** This field can be used to request to check if the entry is outdated by internal comparison */
  outdated_to?: InputMaybe<Scalars['Boolean']>;
};

/** Identifies documents */
export type ExpenseWhereInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<ExpenseWhereInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<ExpenseWhereInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<ExpenseWhereInput>>;
  /** Contains search across all appropriate fields. */
  _search?: InputMaybe<Scalars['String']>;
  account?: InputMaybe<AccountWhereInput>;
  amount?: InputMaybe<Scalars['Float']>;
  /** All values greater than the given value. */
  amount_gt?: InputMaybe<Scalars['Float']>;
  /** All values greater than or equal the given value. */
  amount_gte?: InputMaybe<Scalars['Float']>;
  /** All values that are contained in given list. */
  amount_in?: InputMaybe<Array<InputMaybe<Scalars['Float']>>>;
  /** All values less than the given value. */
  amount_lt?: InputMaybe<Scalars['Float']>;
  /** All values less than or equal the given value. */
  amount_lte?: InputMaybe<Scalars['Float']>;
  /** Any other value that exists and is not equal to the given value. */
  amount_not?: InputMaybe<Scalars['Float']>;
  /** All values that are not contained in given list. */
  amount_not_in?: InputMaybe<Array<InputMaybe<Scalars['Float']>>>;
  card?: InputMaybe<Scalars['Boolean']>;
  /** Any other value that exists and is not equal to the given value. */
  card_not?: InputMaybe<Scalars['Boolean']>;
  category?: InputMaybe<CategoryWhereInput>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  createdAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  createdAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  createdAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  createdAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  createdAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** Any other value that exists and is not equal to the given value. */
  createdAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  createdAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  createdBy?: InputMaybe<UserWhereInput>;
  currency?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  currency_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  currency_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  currency_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Any other value that exists and is not equal to the given value. */
  currency_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  currency_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  currency_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  currency_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  currency_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  currency_starts_with?: InputMaybe<Scalars['String']>;
  date?: InputMaybe<Scalars['Date']>;
  /** All values greater than the given value. */
  date_gt?: InputMaybe<Scalars['Date']>;
  /** All values greater than or equal the given value. */
  date_gte?: InputMaybe<Scalars['Date']>;
  /** All values that are contained in given list. */
  date_in?: InputMaybe<Array<InputMaybe<Scalars['Date']>>>;
  /** All values less than the given value. */
  date_lt?: InputMaybe<Scalars['Date']>;
  /** All values less than or equal the given value. */
  date_lte?: InputMaybe<Scalars['Date']>;
  /** Any other value that exists and is not equal to the given value. */
  date_not?: InputMaybe<Scalars['Date']>;
  /** All values that are not contained in given list. */
  date_not_in?: InputMaybe<Array<InputMaybe<Scalars['Date']>>>;
  deleted?: InputMaybe<Scalars['Boolean']>;
  /** Any other value that exists and is not equal to the given value. */
  deleted_not?: InputMaybe<Scalars['Boolean']>;
  documentInStages_every?: InputMaybe<ExpenseWhereStageInput>;
  documentInStages_none?: InputMaybe<ExpenseWhereStageInput>;
  documentInStages_some?: InputMaybe<ExpenseWhereStageInput>;
  id?: InputMaybe<Scalars['ID']>;
  /** All values containing the given string. */
  id_contains?: InputMaybe<Scalars['ID']>;
  /** All values ending with the given string. */
  id_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are contained in given list. */
  id_in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Any other value that exists and is not equal to the given value. */
  id_not?: InputMaybe<Scalars['ID']>;
  /** All values not containing the given string. */
  id_not_contains?: InputMaybe<Scalars['ID']>;
  /** All values not ending with the given string */
  id_not_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are not contained in given list. */
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** All values not starting with the given string. */
  id_not_starts_with?: InputMaybe<Scalars['ID']>;
  /** All values starting with the given string. */
  id_starts_with?: InputMaybe<Scalars['ID']>;
  note?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  note_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  note_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  note_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Any other value that exists and is not equal to the given value. */
  note_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  note_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  note_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  note_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  note_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  note_starts_with?: InputMaybe<Scalars['String']>;
  payment?: InputMaybe<WalletWhereInput>;
  publishedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  publishedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  publishedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  publishedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  publishedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  publishedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** Any other value that exists and is not equal to the given value. */
  publishedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  publishedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  publishedBy?: InputMaybe<UserWhereInput>;
  scheduledIn_every?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_none?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_some?: InputMaybe<ScheduledOperationWhereInput>;
  travel?: InputMaybe<Scalars['Boolean']>;
  /** Any other value that exists and is not equal to the given value. */
  travel_not?: InputMaybe<Scalars['Boolean']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  updatedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  updatedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  updatedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  updatedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  updatedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** Any other value that exists and is not equal to the given value. */
  updatedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  updatedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  updatedBy?: InputMaybe<UserWhereInput>;
  variable?: InputMaybe<Scalars['Boolean']>;
  /** Any other value that exists and is not equal to the given value. */
  variable_not?: InputMaybe<Scalars['Boolean']>;
};

/** The document in stages filter allows specifying a stage entry to cross compare the same document between different stages */
export type ExpenseWhereStageInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<ExpenseWhereStageInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<ExpenseWhereStageInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<ExpenseWhereStageInput>>;
  /** This field contains fields which can be set as true or false to specify an internal comparison */
  compareWithParent?: InputMaybe<ExpenseWhereComparatorInput>;
  /** Specify the stage to compare with */
  stage?: InputMaybe<Stage>;
};

/** References Expense record uniquely */
export type ExpenseWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']>;
};

export enum ImageFit {
  /** Resizes the image to fit within the specified parameters without distorting, cropping, or changing the aspect ratio. */
  Clip = 'clip',
  /** Resizes the image to fit the specified parameters exactly by removing any parts of the image that don't fit within the boundaries. */
  Crop = 'crop',
  /** Resizes the image to fit within the parameters, but as opposed to 'fit:clip' will not scale the image if the image is smaller than the output size. */
  Max = 'max',
  /** Resizes the image to fit the specified parameters exactly by scaling the image to the desired size. The aspect ratio of the image is not respected and the image can be distorted using this method. */
  Scale = 'scale',
}

export type ImageResizeInput = {
  /** The default value for the fit parameter is fit:clip. */
  fit?: InputMaybe<ImageFit>;
  /** The height in pixels to resize the image to. The value must be an integer from 1 to 10000. */
  height?: InputMaybe<Scalars['Int']>;
  /** The width in pixels to resize the image to. The value must be an integer from 1 to 10000. */
  width?: InputMaybe<Scalars['Int']>;
};

/** Transformations for Images */
export type ImageTransformationInput = {
  /** Resizes the image */
  resize?: InputMaybe<ImageResizeInput>;
};

/** Locale system enumeration */
export enum Locale {
  /** System locale */
  En = 'en',
}

/** Representing a geolocation point with latitude and longitude */
export type Location = {
  __typename?: 'Location';
  distance: Scalars['Float'];
  latitude: Scalars['Float'];
  longitude: Scalars['Float'];
};

/** Representing a geolocation point with latitude and longitude */
export type LocationDistanceArgs = {
  from: LocationInput;
};

/** Input for a geolocation point with latitude and longitude */
export type LocationInput = {
  latitude: Scalars['Float'];
  longitude: Scalars['Float'];
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Create one account */
  createAccount?: Maybe<Account>;
  /**
   * Create one asset
   * @deprecated Asset mutations will be overhauled soon
   */
  createAsset?: Maybe<Asset>;
  /** Create one category */
  createCategory?: Maybe<Category>;
  /** Create one expense */
  createExpense?: Maybe<Expense>;
  /** Create one revenue */
  createRevenue?: Maybe<Revenue>;
  /** Create one scheduledRelease */
  createScheduledRelease?: Maybe<ScheduledRelease>;
  /** Create one transaction */
  createTransaction?: Maybe<Transaction>;
  /** Create one wallet */
  createWallet?: Maybe<Wallet>;
  /** Create one wish */
  createWish?: Maybe<Wish>;
  /** Delete one account from _all_ existing stages. Returns deleted document. */
  deleteAccount?: Maybe<Account>;
  /** Delete one asset from _all_ existing stages. Returns deleted document. */
  deleteAsset?: Maybe<Asset>;
  /** Delete one category from _all_ existing stages. Returns deleted document. */
  deleteCategory?: Maybe<Category>;
  /** Delete one expense from _all_ existing stages. Returns deleted document. */
  deleteExpense?: Maybe<Expense>;
  /**
   * Delete many Account documents
   * @deprecated Please use the new paginated many mutation (deleteManyAccountsConnection)
   */
  deleteManyAccounts: BatchPayload;
  /** Delete many Account documents, return deleted documents */
  deleteManyAccountsConnection: AccountConnection;
  /**
   * Delete many Asset documents
   * @deprecated Please use the new paginated many mutation (deleteManyAssetsConnection)
   */
  deleteManyAssets: BatchPayload;
  /** Delete many Asset documents, return deleted documents */
  deleteManyAssetsConnection: AssetConnection;
  /**
   * Delete many Category documents
   * @deprecated Please use the new paginated many mutation (deleteManyCategoriesConnection)
   */
  deleteManyCategories: BatchPayload;
  /** Delete many Category documents, return deleted documents */
  deleteManyCategoriesConnection: CategoryConnection;
  /**
   * Delete many Expense documents
   * @deprecated Please use the new paginated many mutation (deleteManyExpensesConnection)
   */
  deleteManyExpenses: BatchPayload;
  /** Delete many Expense documents, return deleted documents */
  deleteManyExpensesConnection: ExpenseConnection;
  /**
   * Delete many Revenue documents
   * @deprecated Please use the new paginated many mutation (deleteManyRevenuesConnection)
   */
  deleteManyRevenues: BatchPayload;
  /** Delete many Revenue documents, return deleted documents */
  deleteManyRevenuesConnection: RevenueConnection;
  /**
   * Delete many Transaction documents
   * @deprecated Please use the new paginated many mutation (deleteManyTransactionsConnection)
   */
  deleteManyTransactions: BatchPayload;
  /** Delete many Transaction documents, return deleted documents */
  deleteManyTransactionsConnection: TransactionConnection;
  /**
   * Delete many Wallet documents
   * @deprecated Please use the new paginated many mutation (deleteManyWalletsConnection)
   */
  deleteManyWallets: BatchPayload;
  /** Delete many Wallet documents, return deleted documents */
  deleteManyWalletsConnection: WalletConnection;
  /**
   * Delete many Wish documents
   * @deprecated Please use the new paginated many mutation (deleteManyWishesConnection)
   */
  deleteManyWishes: BatchPayload;
  /** Delete many Wish documents, return deleted documents */
  deleteManyWishesConnection: WishConnection;
  /** Delete one revenue from _all_ existing stages. Returns deleted document. */
  deleteRevenue?: Maybe<Revenue>;
  /** Delete and return scheduled operation */
  deleteScheduledOperation?: Maybe<ScheduledOperation>;
  /** Delete one scheduledRelease from _all_ existing stages. Returns deleted document. */
  deleteScheduledRelease?: Maybe<ScheduledRelease>;
  /** Delete one transaction from _all_ existing stages. Returns deleted document. */
  deleteTransaction?: Maybe<Transaction>;
  /** Delete one wallet from _all_ existing stages. Returns deleted document. */
  deleteWallet?: Maybe<Wallet>;
  /** Delete one wish from _all_ existing stages. Returns deleted document. */
  deleteWish?: Maybe<Wish>;
  /** Publish one account */
  publishAccount?: Maybe<Account>;
  /** Publish one asset */
  publishAsset?: Maybe<Asset>;
  /** Publish one category */
  publishCategory?: Maybe<Category>;
  /** Publish one expense */
  publishExpense?: Maybe<Expense>;
  /**
   * Publish many Account documents
   * @deprecated Please use the new paginated many mutation (publishManyAccountsConnection)
   */
  publishManyAccounts: BatchPayload;
  /** Publish many Account documents */
  publishManyAccountsConnection: AccountConnection;
  /**
   * Publish many Asset documents
   * @deprecated Please use the new paginated many mutation (publishManyAssetsConnection)
   */
  publishManyAssets: BatchPayload;
  /** Publish many Asset documents */
  publishManyAssetsConnection: AssetConnection;
  /**
   * Publish many Category documents
   * @deprecated Please use the new paginated many mutation (publishManyCategoriesConnection)
   */
  publishManyCategories: BatchPayload;
  /** Publish many Category documents */
  publishManyCategoriesConnection: CategoryConnection;
  /**
   * Publish many Expense documents
   * @deprecated Please use the new paginated many mutation (publishManyExpensesConnection)
   */
  publishManyExpenses: BatchPayload;
  /** Publish many Expense documents */
  publishManyExpensesConnection: ExpenseConnection;
  /**
   * Publish many Revenue documents
   * @deprecated Please use the new paginated many mutation (publishManyRevenuesConnection)
   */
  publishManyRevenues: BatchPayload;
  /** Publish many Revenue documents */
  publishManyRevenuesConnection: RevenueConnection;
  /**
   * Publish many Transaction documents
   * @deprecated Please use the new paginated many mutation (publishManyTransactionsConnection)
   */
  publishManyTransactions: BatchPayload;
  /** Publish many Transaction documents */
  publishManyTransactionsConnection: TransactionConnection;
  /**
   * Publish many Wallet documents
   * @deprecated Please use the new paginated many mutation (publishManyWalletsConnection)
   */
  publishManyWallets: BatchPayload;
  /** Publish many Wallet documents */
  publishManyWalletsConnection: WalletConnection;
  /**
   * Publish many Wish documents
   * @deprecated Please use the new paginated many mutation (publishManyWishesConnection)
   */
  publishManyWishes: BatchPayload;
  /** Publish many Wish documents */
  publishManyWishesConnection: WishConnection;
  /** Publish one revenue */
  publishRevenue?: Maybe<Revenue>;
  /** Publish one transaction */
  publishTransaction?: Maybe<Transaction>;
  /** Publish one wallet */
  publishWallet?: Maybe<Wallet>;
  /** Publish one wish */
  publishWish?: Maybe<Wish>;
  /** Schedule to publish one account */
  schedulePublishAccount?: Maybe<Account>;
  /** Schedule to publish one asset */
  schedulePublishAsset?: Maybe<Asset>;
  /** Schedule to publish one category */
  schedulePublishCategory?: Maybe<Category>;
  /** Schedule to publish one expense */
  schedulePublishExpense?: Maybe<Expense>;
  /** Schedule to publish one revenue */
  schedulePublishRevenue?: Maybe<Revenue>;
  /** Schedule to publish one transaction */
  schedulePublishTransaction?: Maybe<Transaction>;
  /** Schedule to publish one wallet */
  schedulePublishWallet?: Maybe<Wallet>;
  /** Schedule to publish one wish */
  schedulePublishWish?: Maybe<Wish>;
  /** Unpublish one account from selected stages. Unpublish either the complete document with its relations, localizations and base data or specific localizations only. */
  scheduleUnpublishAccount?: Maybe<Account>;
  /** Unpublish one asset from selected stages. Unpublish either the complete document with its relations, localizations and base data or specific localizations only. */
  scheduleUnpublishAsset?: Maybe<Asset>;
  /** Unpublish one category from selected stages. Unpublish either the complete document with its relations, localizations and base data or specific localizations only. */
  scheduleUnpublishCategory?: Maybe<Category>;
  /** Unpublish one expense from selected stages. Unpublish either the complete document with its relations, localizations and base data or specific localizations only. */
  scheduleUnpublishExpense?: Maybe<Expense>;
  /** Unpublish one revenue from selected stages. Unpublish either the complete document with its relations, localizations and base data or specific localizations only. */
  scheduleUnpublishRevenue?: Maybe<Revenue>;
  /** Unpublish one transaction from selected stages. Unpublish either the complete document with its relations, localizations and base data or specific localizations only. */
  scheduleUnpublishTransaction?: Maybe<Transaction>;
  /** Unpublish one wallet from selected stages. Unpublish either the complete document with its relations, localizations and base data or specific localizations only. */
  scheduleUnpublishWallet?: Maybe<Wallet>;
  /** Unpublish one wish from selected stages. Unpublish either the complete document with its relations, localizations and base data or specific localizations only. */
  scheduleUnpublishWish?: Maybe<Wish>;
  /** Unpublish one account from selected stages. Unpublish either the complete document with its relations, localizations and base data or specific localizations only. */
  unpublishAccount?: Maybe<Account>;
  /** Unpublish one asset from selected stages. Unpublish either the complete document with its relations, localizations and base data or specific localizations only. */
  unpublishAsset?: Maybe<Asset>;
  /** Unpublish one category from selected stages. Unpublish either the complete document with its relations, localizations and base data or specific localizations only. */
  unpublishCategory?: Maybe<Category>;
  /** Unpublish one expense from selected stages. Unpublish either the complete document with its relations, localizations and base data or specific localizations only. */
  unpublishExpense?: Maybe<Expense>;
  /**
   * Unpublish many Account documents
   * @deprecated Please use the new paginated many mutation (unpublishManyAccountsConnection)
   */
  unpublishManyAccounts: BatchPayload;
  /** Find many Account documents that match criteria in specified stage and unpublish from target stages */
  unpublishManyAccountsConnection: AccountConnection;
  /**
   * Unpublish many Asset documents
   * @deprecated Please use the new paginated many mutation (unpublishManyAssetsConnection)
   */
  unpublishManyAssets: BatchPayload;
  /** Find many Asset documents that match criteria in specified stage and unpublish from target stages */
  unpublishManyAssetsConnection: AssetConnection;
  /**
   * Unpublish many Category documents
   * @deprecated Please use the new paginated many mutation (unpublishManyCategoriesConnection)
   */
  unpublishManyCategories: BatchPayload;
  /** Find many Category documents that match criteria in specified stage and unpublish from target stages */
  unpublishManyCategoriesConnection: CategoryConnection;
  /**
   * Unpublish many Expense documents
   * @deprecated Please use the new paginated many mutation (unpublishManyExpensesConnection)
   */
  unpublishManyExpenses: BatchPayload;
  /** Find many Expense documents that match criteria in specified stage and unpublish from target stages */
  unpublishManyExpensesConnection: ExpenseConnection;
  /**
   * Unpublish many Revenue documents
   * @deprecated Please use the new paginated many mutation (unpublishManyRevenuesConnection)
   */
  unpublishManyRevenues: BatchPayload;
  /** Find many Revenue documents that match criteria in specified stage and unpublish from target stages */
  unpublishManyRevenuesConnection: RevenueConnection;
  /**
   * Unpublish many Transaction documents
   * @deprecated Please use the new paginated many mutation (unpublishManyTransactionsConnection)
   */
  unpublishManyTransactions: BatchPayload;
  /** Find many Transaction documents that match criteria in specified stage and unpublish from target stages */
  unpublishManyTransactionsConnection: TransactionConnection;
  /**
   * Unpublish many Wallet documents
   * @deprecated Please use the new paginated many mutation (unpublishManyWalletsConnection)
   */
  unpublishManyWallets: BatchPayload;
  /** Find many Wallet documents that match criteria in specified stage and unpublish from target stages */
  unpublishManyWalletsConnection: WalletConnection;
  /**
   * Unpublish many Wish documents
   * @deprecated Please use the new paginated many mutation (unpublishManyWishesConnection)
   */
  unpublishManyWishes: BatchPayload;
  /** Find many Wish documents that match criteria in specified stage and unpublish from target stages */
  unpublishManyWishesConnection: WishConnection;
  /** Unpublish one revenue from selected stages. Unpublish either the complete document with its relations, localizations and base data or specific localizations only. */
  unpublishRevenue?: Maybe<Revenue>;
  /** Unpublish one transaction from selected stages. Unpublish either the complete document with its relations, localizations and base data or specific localizations only. */
  unpublishTransaction?: Maybe<Transaction>;
  /** Unpublish one wallet from selected stages. Unpublish either the complete document with its relations, localizations and base data or specific localizations only. */
  unpublishWallet?: Maybe<Wallet>;
  /** Unpublish one wish from selected stages. Unpublish either the complete document with its relations, localizations and base data or specific localizations only. */
  unpublishWish?: Maybe<Wish>;
  /** Update one account */
  updateAccount?: Maybe<Account>;
  /** Update one asset */
  updateAsset?: Maybe<Asset>;
  /** Update one category */
  updateCategory?: Maybe<Category>;
  /** Update one expense */
  updateExpense?: Maybe<Expense>;
  /**
   * Update many accounts
   * @deprecated Please use the new paginated many mutation (updateManyAccountsConnection)
   */
  updateManyAccounts: BatchPayload;
  /** Update many Account documents */
  updateManyAccountsConnection: AccountConnection;
  /**
   * Update many assets
   * @deprecated Please use the new paginated many mutation (updateManyAssetsConnection)
   */
  updateManyAssets: BatchPayload;
  /** Update many Asset documents */
  updateManyAssetsConnection: AssetConnection;
  /**
   * Update many categories
   * @deprecated Please use the new paginated many mutation (updateManyCategoriesConnection)
   */
  updateManyCategories: BatchPayload;
  /** Update many Category documents */
  updateManyCategoriesConnection: CategoryConnection;
  /**
   * Update many expenses
   * @deprecated Please use the new paginated many mutation (updateManyExpensesConnection)
   */
  updateManyExpenses: BatchPayload;
  /** Update many Expense documents */
  updateManyExpensesConnection: ExpenseConnection;
  /**
   * Update many revenues
   * @deprecated Please use the new paginated many mutation (updateManyRevenuesConnection)
   */
  updateManyRevenues: BatchPayload;
  /** Update many Revenue documents */
  updateManyRevenuesConnection: RevenueConnection;
  /**
   * Update many transactions
   * @deprecated Please use the new paginated many mutation (updateManyTransactionsConnection)
   */
  updateManyTransactions: BatchPayload;
  /** Update many Transaction documents */
  updateManyTransactionsConnection: TransactionConnection;
  /**
   * Update many wallets
   * @deprecated Please use the new paginated many mutation (updateManyWalletsConnection)
   */
  updateManyWallets: BatchPayload;
  /** Update many Wallet documents */
  updateManyWalletsConnection: WalletConnection;
  /**
   * Update many wishes
   * @deprecated Please use the new paginated many mutation (updateManyWishesConnection)
   */
  updateManyWishes: BatchPayload;
  /** Update many Wish documents */
  updateManyWishesConnection: WishConnection;
  /** Update one revenue */
  updateRevenue?: Maybe<Revenue>;
  /** Update one scheduledRelease */
  updateScheduledRelease?: Maybe<ScheduledRelease>;
  /** Update one transaction */
  updateTransaction?: Maybe<Transaction>;
  /** Update one wallet */
  updateWallet?: Maybe<Wallet>;
  /** Update one wish */
  updateWish?: Maybe<Wish>;
  /** Upsert one account */
  upsertAccount?: Maybe<Account>;
  /** Upsert one asset */
  upsertAsset?: Maybe<Asset>;
  /** Upsert one category */
  upsertCategory?: Maybe<Category>;
  /** Upsert one expense */
  upsertExpense?: Maybe<Expense>;
  /** Upsert one revenue */
  upsertRevenue?: Maybe<Revenue>;
  /** Upsert one transaction */
  upsertTransaction?: Maybe<Transaction>;
  /** Upsert one wallet */
  upsertWallet?: Maybe<Wallet>;
  /** Upsert one wish */
  upsertWish?: Maybe<Wish>;
};

export type MutationCreateAccountArgs = {
  data: AccountCreateInput;
};

export type MutationCreateAssetArgs = {
  data: AssetCreateInput;
};

export type MutationCreateCategoryArgs = {
  data: CategoryCreateInput;
};

export type MutationCreateExpenseArgs = {
  data: ExpenseCreateInput;
};

export type MutationCreateRevenueArgs = {
  data: RevenueCreateInput;
};

export type MutationCreateScheduledReleaseArgs = {
  data: ScheduledReleaseCreateInput;
};

export type MutationCreateTransactionArgs = {
  data: TransactionCreateInput;
};

export type MutationCreateWalletArgs = {
  data: WalletCreateInput;
};

export type MutationCreateWishArgs = {
  data: WishCreateInput;
};

export type MutationDeleteAccountArgs = {
  where: AccountWhereUniqueInput;
};

export type MutationDeleteAssetArgs = {
  where: AssetWhereUniqueInput;
};

export type MutationDeleteCategoryArgs = {
  where: CategoryWhereUniqueInput;
};

export type MutationDeleteExpenseArgs = {
  where: ExpenseWhereUniqueInput;
};

export type MutationDeleteManyAccountsArgs = {
  where?: InputMaybe<AccountManyWhereInput>;
};

export type MutationDeleteManyAccountsConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<AccountManyWhereInput>;
};

export type MutationDeleteManyAssetsArgs = {
  where?: InputMaybe<AssetManyWhereInput>;
};

export type MutationDeleteManyAssetsConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<AssetManyWhereInput>;
};

export type MutationDeleteManyCategoriesArgs = {
  where?: InputMaybe<CategoryManyWhereInput>;
};

export type MutationDeleteManyCategoriesConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<CategoryManyWhereInput>;
};

export type MutationDeleteManyExpensesArgs = {
  where?: InputMaybe<ExpenseManyWhereInput>;
};

export type MutationDeleteManyExpensesConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ExpenseManyWhereInput>;
};

export type MutationDeleteManyRevenuesArgs = {
  where?: InputMaybe<RevenueManyWhereInput>;
};

export type MutationDeleteManyRevenuesConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<RevenueManyWhereInput>;
};

export type MutationDeleteManyTransactionsArgs = {
  where?: InputMaybe<TransactionManyWhereInput>;
};

export type MutationDeleteManyTransactionsConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<TransactionManyWhereInput>;
};

export type MutationDeleteManyWalletsArgs = {
  where?: InputMaybe<WalletManyWhereInput>;
};

export type MutationDeleteManyWalletsConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<WalletManyWhereInput>;
};

export type MutationDeleteManyWishesArgs = {
  where?: InputMaybe<WishManyWhereInput>;
};

export type MutationDeleteManyWishesConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<WishManyWhereInput>;
};

export type MutationDeleteRevenueArgs = {
  where: RevenueWhereUniqueInput;
};

export type MutationDeleteScheduledOperationArgs = {
  where: ScheduledOperationWhereUniqueInput;
};

export type MutationDeleteScheduledReleaseArgs = {
  where: ScheduledReleaseWhereUniqueInput;
};

export type MutationDeleteTransactionArgs = {
  where: TransactionWhereUniqueInput;
};

export type MutationDeleteWalletArgs = {
  where: WalletWhereUniqueInput;
};

export type MutationDeleteWishArgs = {
  where: WishWhereUniqueInput;
};

export type MutationPublishAccountArgs = {
  to?: Array<Stage>;
  where: AccountWhereUniqueInput;
};

export type MutationPublishAssetArgs = {
  locales?: InputMaybe<Array<Locale>>;
  publishBase?: InputMaybe<Scalars['Boolean']>;
  to?: Array<Stage>;
  where: AssetWhereUniqueInput;
  withDefaultLocale?: InputMaybe<Scalars['Boolean']>;
};

export type MutationPublishCategoryArgs = {
  to?: Array<Stage>;
  where: CategoryWhereUniqueInput;
};

export type MutationPublishExpenseArgs = {
  to?: Array<Stage>;
  where: ExpenseWhereUniqueInput;
};

export type MutationPublishManyAccountsArgs = {
  to?: Array<Stage>;
  where?: InputMaybe<AccountManyWhereInput>;
};

export type MutationPublishManyAccountsConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
  from?: InputMaybe<Stage>;
  last?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  to?: Array<Stage>;
  where?: InputMaybe<AccountManyWhereInput>;
};

export type MutationPublishManyAssetsArgs = {
  locales?: InputMaybe<Array<Locale>>;
  publishBase?: InputMaybe<Scalars['Boolean']>;
  to?: Array<Stage>;
  where?: InputMaybe<AssetManyWhereInput>;
  withDefaultLocale?: InputMaybe<Scalars['Boolean']>;
};

export type MutationPublishManyAssetsConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
  from?: InputMaybe<Stage>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: InputMaybe<Array<Locale>>;
  publishBase?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
  to?: Array<Stage>;
  where?: InputMaybe<AssetManyWhereInput>;
  withDefaultLocale?: InputMaybe<Scalars['Boolean']>;
};

export type MutationPublishManyCategoriesArgs = {
  to?: Array<Stage>;
  where?: InputMaybe<CategoryManyWhereInput>;
};

export type MutationPublishManyCategoriesConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
  from?: InputMaybe<Stage>;
  last?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  to?: Array<Stage>;
  where?: InputMaybe<CategoryManyWhereInput>;
};

export type MutationPublishManyExpensesArgs = {
  to?: Array<Stage>;
  where?: InputMaybe<ExpenseManyWhereInput>;
};

export type MutationPublishManyExpensesConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
  from?: InputMaybe<Stage>;
  last?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  to?: Array<Stage>;
  where?: InputMaybe<ExpenseManyWhereInput>;
};

export type MutationPublishManyRevenuesArgs = {
  to?: Array<Stage>;
  where?: InputMaybe<RevenueManyWhereInput>;
};

export type MutationPublishManyRevenuesConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
  from?: InputMaybe<Stage>;
  last?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  to?: Array<Stage>;
  where?: InputMaybe<RevenueManyWhereInput>;
};

export type MutationPublishManyTransactionsArgs = {
  to?: Array<Stage>;
  where?: InputMaybe<TransactionManyWhereInput>;
};

export type MutationPublishManyTransactionsConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
  from?: InputMaybe<Stage>;
  last?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  to?: Array<Stage>;
  where?: InputMaybe<TransactionManyWhereInput>;
};

export type MutationPublishManyWalletsArgs = {
  to?: Array<Stage>;
  where?: InputMaybe<WalletManyWhereInput>;
};

export type MutationPublishManyWalletsConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
  from?: InputMaybe<Stage>;
  last?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  to?: Array<Stage>;
  where?: InputMaybe<WalletManyWhereInput>;
};

export type MutationPublishManyWishesArgs = {
  to?: Array<Stage>;
  where?: InputMaybe<WishManyWhereInput>;
};

export type MutationPublishManyWishesConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
  from?: InputMaybe<Stage>;
  last?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  to?: Array<Stage>;
  where?: InputMaybe<WishManyWhereInput>;
};

export type MutationPublishRevenueArgs = {
  to?: Array<Stage>;
  where: RevenueWhereUniqueInput;
};

export type MutationPublishTransactionArgs = {
  to?: Array<Stage>;
  where: TransactionWhereUniqueInput;
};

export type MutationPublishWalletArgs = {
  to?: Array<Stage>;
  where: WalletWhereUniqueInput;
};

export type MutationPublishWishArgs = {
  to?: Array<Stage>;
  where: WishWhereUniqueInput;
};

export type MutationSchedulePublishAccountArgs = {
  releaseAt?: InputMaybe<Scalars['DateTime']>;
  releaseId?: InputMaybe<Scalars['String']>;
  to?: Array<Stage>;
  where: AccountWhereUniqueInput;
};

export type MutationSchedulePublishAssetArgs = {
  locales?: InputMaybe<Array<Locale>>;
  publishBase?: InputMaybe<Scalars['Boolean']>;
  releaseAt?: InputMaybe<Scalars['DateTime']>;
  releaseId?: InputMaybe<Scalars['String']>;
  to?: Array<Stage>;
  where: AssetWhereUniqueInput;
  withDefaultLocale?: InputMaybe<Scalars['Boolean']>;
};

export type MutationSchedulePublishCategoryArgs = {
  releaseAt?: InputMaybe<Scalars['DateTime']>;
  releaseId?: InputMaybe<Scalars['String']>;
  to?: Array<Stage>;
  where: CategoryWhereUniqueInput;
};

export type MutationSchedulePublishExpenseArgs = {
  releaseAt?: InputMaybe<Scalars['DateTime']>;
  releaseId?: InputMaybe<Scalars['String']>;
  to?: Array<Stage>;
  where: ExpenseWhereUniqueInput;
};

export type MutationSchedulePublishRevenueArgs = {
  releaseAt?: InputMaybe<Scalars['DateTime']>;
  releaseId?: InputMaybe<Scalars['String']>;
  to?: Array<Stage>;
  where: RevenueWhereUniqueInput;
};

export type MutationSchedulePublishTransactionArgs = {
  releaseAt?: InputMaybe<Scalars['DateTime']>;
  releaseId?: InputMaybe<Scalars['String']>;
  to?: Array<Stage>;
  where: TransactionWhereUniqueInput;
};

export type MutationSchedulePublishWalletArgs = {
  releaseAt?: InputMaybe<Scalars['DateTime']>;
  releaseId?: InputMaybe<Scalars['String']>;
  to?: Array<Stage>;
  where: WalletWhereUniqueInput;
};

export type MutationSchedulePublishWishArgs = {
  releaseAt?: InputMaybe<Scalars['DateTime']>;
  releaseId?: InputMaybe<Scalars['String']>;
  to?: Array<Stage>;
  where: WishWhereUniqueInput;
};

export type MutationScheduleUnpublishAccountArgs = {
  from?: Array<Stage>;
  releaseAt?: InputMaybe<Scalars['DateTime']>;
  releaseId?: InputMaybe<Scalars['String']>;
  where: AccountWhereUniqueInput;
};

export type MutationScheduleUnpublishAssetArgs = {
  from?: Array<Stage>;
  locales?: InputMaybe<Array<Locale>>;
  releaseAt?: InputMaybe<Scalars['DateTime']>;
  releaseId?: InputMaybe<Scalars['String']>;
  unpublishBase?: InputMaybe<Scalars['Boolean']>;
  where: AssetWhereUniqueInput;
};

export type MutationScheduleUnpublishCategoryArgs = {
  from?: Array<Stage>;
  releaseAt?: InputMaybe<Scalars['DateTime']>;
  releaseId?: InputMaybe<Scalars['String']>;
  where: CategoryWhereUniqueInput;
};

export type MutationScheduleUnpublishExpenseArgs = {
  from?: Array<Stage>;
  releaseAt?: InputMaybe<Scalars['DateTime']>;
  releaseId?: InputMaybe<Scalars['String']>;
  where: ExpenseWhereUniqueInput;
};

export type MutationScheduleUnpublishRevenueArgs = {
  from?: Array<Stage>;
  releaseAt?: InputMaybe<Scalars['DateTime']>;
  releaseId?: InputMaybe<Scalars['String']>;
  where: RevenueWhereUniqueInput;
};

export type MutationScheduleUnpublishTransactionArgs = {
  from?: Array<Stage>;
  releaseAt?: InputMaybe<Scalars['DateTime']>;
  releaseId?: InputMaybe<Scalars['String']>;
  where: TransactionWhereUniqueInput;
};

export type MutationScheduleUnpublishWalletArgs = {
  from?: Array<Stage>;
  releaseAt?: InputMaybe<Scalars['DateTime']>;
  releaseId?: InputMaybe<Scalars['String']>;
  where: WalletWhereUniqueInput;
};

export type MutationScheduleUnpublishWishArgs = {
  from?: Array<Stage>;
  releaseAt?: InputMaybe<Scalars['DateTime']>;
  releaseId?: InputMaybe<Scalars['String']>;
  where: WishWhereUniqueInput;
};

export type MutationUnpublishAccountArgs = {
  from?: Array<Stage>;
  where: AccountWhereUniqueInput;
};

export type MutationUnpublishAssetArgs = {
  from?: Array<Stage>;
  locales?: InputMaybe<Array<Locale>>;
  unpublishBase?: InputMaybe<Scalars['Boolean']>;
  where: AssetWhereUniqueInput;
};

export type MutationUnpublishCategoryArgs = {
  from?: Array<Stage>;
  where: CategoryWhereUniqueInput;
};

export type MutationUnpublishExpenseArgs = {
  from?: Array<Stage>;
  where: ExpenseWhereUniqueInput;
};

export type MutationUnpublishManyAccountsArgs = {
  from?: Array<Stage>;
  where?: InputMaybe<AccountManyWhereInput>;
};

export type MutationUnpublishManyAccountsConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
  from?: Array<Stage>;
  last?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  stage?: InputMaybe<Stage>;
  where?: InputMaybe<AccountManyWhereInput>;
};

export type MutationUnpublishManyAssetsArgs = {
  from?: Array<Stage>;
  locales?: InputMaybe<Array<Locale>>;
  unpublishBase?: InputMaybe<Scalars['Boolean']>;
  where?: InputMaybe<AssetManyWhereInput>;
};

export type MutationUnpublishManyAssetsConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
  from?: Array<Stage>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: InputMaybe<Array<Locale>>;
  skip?: InputMaybe<Scalars['Int']>;
  stage?: InputMaybe<Stage>;
  unpublishBase?: InputMaybe<Scalars['Boolean']>;
  where?: InputMaybe<AssetManyWhereInput>;
};

export type MutationUnpublishManyCategoriesArgs = {
  from?: Array<Stage>;
  where?: InputMaybe<CategoryManyWhereInput>;
};

export type MutationUnpublishManyCategoriesConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
  from?: Array<Stage>;
  last?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  stage?: InputMaybe<Stage>;
  where?: InputMaybe<CategoryManyWhereInput>;
};

export type MutationUnpublishManyExpensesArgs = {
  from?: Array<Stage>;
  where?: InputMaybe<ExpenseManyWhereInput>;
};

export type MutationUnpublishManyExpensesConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
  from?: Array<Stage>;
  last?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  stage?: InputMaybe<Stage>;
  where?: InputMaybe<ExpenseManyWhereInput>;
};

export type MutationUnpublishManyRevenuesArgs = {
  from?: Array<Stage>;
  where?: InputMaybe<RevenueManyWhereInput>;
};

export type MutationUnpublishManyRevenuesConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
  from?: Array<Stage>;
  last?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  stage?: InputMaybe<Stage>;
  where?: InputMaybe<RevenueManyWhereInput>;
};

export type MutationUnpublishManyTransactionsArgs = {
  from?: Array<Stage>;
  where?: InputMaybe<TransactionManyWhereInput>;
};

export type MutationUnpublishManyTransactionsConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
  from?: Array<Stage>;
  last?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  stage?: InputMaybe<Stage>;
  where?: InputMaybe<TransactionManyWhereInput>;
};

export type MutationUnpublishManyWalletsArgs = {
  from?: Array<Stage>;
  where?: InputMaybe<WalletManyWhereInput>;
};

export type MutationUnpublishManyWalletsConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
  from?: Array<Stage>;
  last?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  stage?: InputMaybe<Stage>;
  where?: InputMaybe<WalletManyWhereInput>;
};

export type MutationUnpublishManyWishesArgs = {
  from?: Array<Stage>;
  where?: InputMaybe<WishManyWhereInput>;
};

export type MutationUnpublishManyWishesConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
  from?: Array<Stage>;
  last?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  stage?: InputMaybe<Stage>;
  where?: InputMaybe<WishManyWhereInput>;
};

export type MutationUnpublishRevenueArgs = {
  from?: Array<Stage>;
  where: RevenueWhereUniqueInput;
};

export type MutationUnpublishTransactionArgs = {
  from?: Array<Stage>;
  where: TransactionWhereUniqueInput;
};

export type MutationUnpublishWalletArgs = {
  from?: Array<Stage>;
  where: WalletWhereUniqueInput;
};

export type MutationUnpublishWishArgs = {
  from?: Array<Stage>;
  where: WishWhereUniqueInput;
};

export type MutationUpdateAccountArgs = {
  data: AccountUpdateInput;
  where: AccountWhereUniqueInput;
};

export type MutationUpdateAssetArgs = {
  data: AssetUpdateInput;
  where: AssetWhereUniqueInput;
};

export type MutationUpdateCategoryArgs = {
  data: CategoryUpdateInput;
  where: CategoryWhereUniqueInput;
};

export type MutationUpdateExpenseArgs = {
  data: ExpenseUpdateInput;
  where: ExpenseWhereUniqueInput;
};

export type MutationUpdateManyAccountsArgs = {
  data: AccountUpdateManyInput;
  where?: InputMaybe<AccountManyWhereInput>;
};

export type MutationUpdateManyAccountsConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  data: AccountUpdateManyInput;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<AccountManyWhereInput>;
};

export type MutationUpdateManyAssetsArgs = {
  data: AssetUpdateManyInput;
  where?: InputMaybe<AssetManyWhereInput>;
};

export type MutationUpdateManyAssetsConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  data: AssetUpdateManyInput;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<AssetManyWhereInput>;
};

export type MutationUpdateManyCategoriesArgs = {
  data: CategoryUpdateManyInput;
  where?: InputMaybe<CategoryManyWhereInput>;
};

export type MutationUpdateManyCategoriesConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  data: CategoryUpdateManyInput;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<CategoryManyWhereInput>;
};

export type MutationUpdateManyExpensesArgs = {
  data: ExpenseUpdateManyInput;
  where?: InputMaybe<ExpenseManyWhereInput>;
};

export type MutationUpdateManyExpensesConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  data: ExpenseUpdateManyInput;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ExpenseManyWhereInput>;
};

export type MutationUpdateManyRevenuesArgs = {
  data: RevenueUpdateManyInput;
  where?: InputMaybe<RevenueManyWhereInput>;
};

export type MutationUpdateManyRevenuesConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  data: RevenueUpdateManyInput;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<RevenueManyWhereInput>;
};

export type MutationUpdateManyTransactionsArgs = {
  data: TransactionUpdateManyInput;
  where?: InputMaybe<TransactionManyWhereInput>;
};

export type MutationUpdateManyTransactionsConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  data: TransactionUpdateManyInput;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<TransactionManyWhereInput>;
};

export type MutationUpdateManyWalletsArgs = {
  data: WalletUpdateManyInput;
  where?: InputMaybe<WalletManyWhereInput>;
};

export type MutationUpdateManyWalletsConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  data: WalletUpdateManyInput;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<WalletManyWhereInput>;
};

export type MutationUpdateManyWishesArgs = {
  data: WishUpdateManyInput;
  where?: InputMaybe<WishManyWhereInput>;
};

export type MutationUpdateManyWishesConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  data: WishUpdateManyInput;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<WishManyWhereInput>;
};

export type MutationUpdateRevenueArgs = {
  data: RevenueUpdateInput;
  where: RevenueWhereUniqueInput;
};

export type MutationUpdateScheduledReleaseArgs = {
  data: ScheduledReleaseUpdateInput;
  where: ScheduledReleaseWhereUniqueInput;
};

export type MutationUpdateTransactionArgs = {
  data: TransactionUpdateInput;
  where: TransactionWhereUniqueInput;
};

export type MutationUpdateWalletArgs = {
  data: WalletUpdateInput;
  where: WalletWhereUniqueInput;
};

export type MutationUpdateWishArgs = {
  data: WishUpdateInput;
  where: WishWhereUniqueInput;
};

export type MutationUpsertAccountArgs = {
  upsert: AccountUpsertInput;
  where: AccountWhereUniqueInput;
};

export type MutationUpsertAssetArgs = {
  upsert: AssetUpsertInput;
  where: AssetWhereUniqueInput;
};

export type MutationUpsertCategoryArgs = {
  upsert: CategoryUpsertInput;
  where: CategoryWhereUniqueInput;
};

export type MutationUpsertExpenseArgs = {
  upsert: ExpenseUpsertInput;
  where: ExpenseWhereUniqueInput;
};

export type MutationUpsertRevenueArgs = {
  upsert: RevenueUpsertInput;
  where: RevenueWhereUniqueInput;
};

export type MutationUpsertTransactionArgs = {
  upsert: TransactionUpsertInput;
  where: TransactionWhereUniqueInput;
};

export type MutationUpsertWalletArgs = {
  upsert: WalletUpsertInput;
  where: WalletWhereUniqueInput;
};

export type MutationUpsertWishArgs = {
  upsert: WishUpsertInput;
  where: WishWhereUniqueInput;
};

/** An object with an ID */
export type Node = {
  /** The id of the object. */
  id: Scalars['ID'];
  /** The Stage of an object */
  stage: Stage;
};

/** Information about pagination in a connection. */
export type PageInfo = {
  __typename?: 'PageInfo';
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars['String']>;
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars['Boolean'];
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars['Boolean'];
  /** Number of items in the current page. */
  pageSize?: Maybe<Scalars['Int']>;
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars['String']>;
};

export type PublishLocaleInput = {
  /** Locales to publish */
  locale: Locale;
  /** Stages to publish selected locales to */
  stages: Array<Stage>;
};

export type Query = {
  __typename?: 'Query';
  /** Retrieve a single account */
  account?: Maybe<Account>;
  /** Retrieve document version */
  accountVersion?: Maybe<DocumentVersion>;
  /** Retrieve multiple accounts */
  accounts: Array<Account>;
  /** Retrieve multiple accounts using the Relay connection interface */
  accountsConnection: AccountConnection;
  /** Retrieve a single asset */
  asset?: Maybe<Asset>;
  /** Retrieve document version */
  assetVersion?: Maybe<DocumentVersion>;
  /** Retrieve multiple assets */
  assets: Array<Asset>;
  /** Retrieve multiple assets using the Relay connection interface */
  assetsConnection: AssetConnection;
  /** Retrieve multiple categories */
  categories: Array<Category>;
  /** Retrieve multiple categories using the Relay connection interface */
  categoriesConnection: CategoryConnection;
  /** Retrieve a single category */
  category?: Maybe<Category>;
  /** Retrieve document version */
  categoryVersion?: Maybe<DocumentVersion>;
  /** Retrieve a single expense */
  expense?: Maybe<Expense>;
  /** Retrieve document version */
  expenseVersion?: Maybe<DocumentVersion>;
  /** Retrieve multiple expenses */
  expenses: Array<Expense>;
  /** Retrieve multiple expenses using the Relay connection interface */
  expensesConnection: ExpenseConnection;
  /** Fetches an object given its ID */
  node?: Maybe<Node>;
  /** Retrieve a single revenue */
  revenue?: Maybe<Revenue>;
  /** Retrieve document version */
  revenueVersion?: Maybe<DocumentVersion>;
  /** Retrieve multiple revenues */
  revenues: Array<Revenue>;
  /** Retrieve multiple revenues using the Relay connection interface */
  revenuesConnection: RevenueConnection;
  /** Retrieve a single scheduledOperation */
  scheduledOperation?: Maybe<ScheduledOperation>;
  /** Retrieve multiple scheduledOperations */
  scheduledOperations: Array<ScheduledOperation>;
  /** Retrieve multiple scheduledOperations using the Relay connection interface */
  scheduledOperationsConnection: ScheduledOperationConnection;
  /** Retrieve a single scheduledRelease */
  scheduledRelease?: Maybe<ScheduledRelease>;
  /** Retrieve multiple scheduledReleases */
  scheduledReleases: Array<ScheduledRelease>;
  /** Retrieve multiple scheduledReleases using the Relay connection interface */
  scheduledReleasesConnection: ScheduledReleaseConnection;
  /** Retrieve a single transaction */
  transaction?: Maybe<Transaction>;
  /** Retrieve document version */
  transactionVersion?: Maybe<DocumentVersion>;
  /** Retrieve multiple transactions */
  transactions: Array<Transaction>;
  /** Retrieve multiple transactions using the Relay connection interface */
  transactionsConnection: TransactionConnection;
  /** Retrieve a single user */
  user?: Maybe<User>;
  /** Retrieve multiple users */
  users: Array<User>;
  /** Retrieve multiple users using the Relay connection interface */
  usersConnection: UserConnection;
  /** Retrieve a single wallet */
  wallet?: Maybe<Wallet>;
  /** Retrieve document version */
  walletVersion?: Maybe<DocumentVersion>;
  /** Retrieve multiple wallets */
  wallets: Array<Wallet>;
  /** Retrieve multiple wallets using the Relay connection interface */
  walletsConnection: WalletConnection;
  /** Retrieve a single wish */
  wish?: Maybe<Wish>;
  /** Retrieve document version */
  wishVersion?: Maybe<DocumentVersion>;
  /** Retrieve multiple wishes */
  wishes: Array<Wish>;
  /** Retrieve multiple wishes using the Relay connection interface */
  wishesConnection: WishConnection;
};

export type QueryAccountArgs = {
  locales?: Array<Locale>;
  stage?: Stage;
  where: AccountWhereUniqueInput;
};

export type QueryAccountVersionArgs = {
  where: VersionWhereInput;
};

export type QueryAccountsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: Array<Locale>;
  orderBy?: InputMaybe<AccountOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  stage?: Stage;
  where?: InputMaybe<AccountWhereInput>;
};

export type QueryAccountsConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: Array<Locale>;
  orderBy?: InputMaybe<AccountOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  stage?: Stage;
  where?: InputMaybe<AccountWhereInput>;
};

export type QueryAssetArgs = {
  locales?: Array<Locale>;
  stage?: Stage;
  where: AssetWhereUniqueInput;
};

export type QueryAssetVersionArgs = {
  where: VersionWhereInput;
};

export type QueryAssetsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: Array<Locale>;
  orderBy?: InputMaybe<AssetOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  stage?: Stage;
  where?: InputMaybe<AssetWhereInput>;
};

export type QueryAssetsConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: Array<Locale>;
  orderBy?: InputMaybe<AssetOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  stage?: Stage;
  where?: InputMaybe<AssetWhereInput>;
};

export type QueryCategoriesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: Array<Locale>;
  orderBy?: InputMaybe<CategoryOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  stage?: Stage;
  where?: InputMaybe<CategoryWhereInput>;
};

export type QueryCategoriesConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: Array<Locale>;
  orderBy?: InputMaybe<CategoryOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  stage?: Stage;
  where?: InputMaybe<CategoryWhereInput>;
};

export type QueryCategoryArgs = {
  locales?: Array<Locale>;
  stage?: Stage;
  where: CategoryWhereUniqueInput;
};

export type QueryCategoryVersionArgs = {
  where: VersionWhereInput;
};

export type QueryExpenseArgs = {
  locales?: Array<Locale>;
  stage?: Stage;
  where: ExpenseWhereUniqueInput;
};

export type QueryExpenseVersionArgs = {
  where: VersionWhereInput;
};

export type QueryExpensesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: Array<Locale>;
  orderBy?: InputMaybe<ExpenseOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  stage?: Stage;
  where?: InputMaybe<ExpenseWhereInput>;
};

export type QueryExpensesConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: Array<Locale>;
  orderBy?: InputMaybe<ExpenseOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  stage?: Stage;
  where?: InputMaybe<ExpenseWhereInput>;
};

export type QueryNodeArgs = {
  id: Scalars['ID'];
  locales?: Array<Locale>;
  stage?: Stage;
};

export type QueryRevenueArgs = {
  locales?: Array<Locale>;
  stage?: Stage;
  where: RevenueWhereUniqueInput;
};

export type QueryRevenueVersionArgs = {
  where: VersionWhereInput;
};

export type QueryRevenuesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: Array<Locale>;
  orderBy?: InputMaybe<RevenueOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  stage?: Stage;
  where?: InputMaybe<RevenueWhereInput>;
};

export type QueryRevenuesConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: Array<Locale>;
  orderBy?: InputMaybe<RevenueOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  stage?: Stage;
  where?: InputMaybe<RevenueWhereInput>;
};

export type QueryScheduledOperationArgs = {
  locales?: Array<Locale>;
  stage?: Stage;
  where: ScheduledOperationWhereUniqueInput;
};

export type QueryScheduledOperationsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: Array<Locale>;
  orderBy?: InputMaybe<ScheduledOperationOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  stage?: Stage;
  where?: InputMaybe<ScheduledOperationWhereInput>;
};

export type QueryScheduledOperationsConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: Array<Locale>;
  orderBy?: InputMaybe<ScheduledOperationOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  stage?: Stage;
  where?: InputMaybe<ScheduledOperationWhereInput>;
};

export type QueryScheduledReleaseArgs = {
  locales?: Array<Locale>;
  stage?: Stage;
  where: ScheduledReleaseWhereUniqueInput;
};

export type QueryScheduledReleasesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: Array<Locale>;
  orderBy?: InputMaybe<ScheduledReleaseOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  stage?: Stage;
  where?: InputMaybe<ScheduledReleaseWhereInput>;
};

export type QueryScheduledReleasesConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: Array<Locale>;
  orderBy?: InputMaybe<ScheduledReleaseOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  stage?: Stage;
  where?: InputMaybe<ScheduledReleaseWhereInput>;
};

export type QueryTransactionArgs = {
  locales?: Array<Locale>;
  stage?: Stage;
  where: TransactionWhereUniqueInput;
};

export type QueryTransactionVersionArgs = {
  where: VersionWhereInput;
};

export type QueryTransactionsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: Array<Locale>;
  orderBy?: InputMaybe<TransactionOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  stage?: Stage;
  where?: InputMaybe<TransactionWhereInput>;
};

export type QueryTransactionsConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: Array<Locale>;
  orderBy?: InputMaybe<TransactionOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  stage?: Stage;
  where?: InputMaybe<TransactionWhereInput>;
};

export type QueryUserArgs = {
  locales?: Array<Locale>;
  stage?: Stage;
  where: UserWhereUniqueInput;
};

export type QueryUsersArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: Array<Locale>;
  orderBy?: InputMaybe<UserOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  stage?: Stage;
  where?: InputMaybe<UserWhereInput>;
};

export type QueryUsersConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: Array<Locale>;
  orderBy?: InputMaybe<UserOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  stage?: Stage;
  where?: InputMaybe<UserWhereInput>;
};

export type QueryWalletArgs = {
  locales?: Array<Locale>;
  stage?: Stage;
  where: WalletWhereUniqueInput;
};

export type QueryWalletVersionArgs = {
  where: VersionWhereInput;
};

export type QueryWalletsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: Array<Locale>;
  orderBy?: InputMaybe<WalletOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  stage?: Stage;
  where?: InputMaybe<WalletWhereInput>;
};

export type QueryWalletsConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: Array<Locale>;
  orderBy?: InputMaybe<WalletOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  stage?: Stage;
  where?: InputMaybe<WalletWhereInput>;
};

export type QueryWishArgs = {
  locales?: Array<Locale>;
  stage?: Stage;
  where: WishWhereUniqueInput;
};

export type QueryWishVersionArgs = {
  where: VersionWhereInput;
};

export type QueryWishesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: Array<Locale>;
  orderBy?: InputMaybe<WishOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  stage?: Stage;
  where?: InputMaybe<WishWhereInput>;
};

export type QueryWishesConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: Array<Locale>;
  orderBy?: InputMaybe<WishOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  stage?: Stage;
  where?: InputMaybe<WishWhereInput>;
};

/** Representing a RGBA color value: https://developer.mozilla.org/en-US/docs/Web/CSS/color_value#rgb()_and_rgba() */
export type Rgba = {
  __typename?: 'RGBA';
  a: Scalars['RGBATransparency'];
  b: Scalars['RGBAHue'];
  g: Scalars['RGBAHue'];
  r: Scalars['RGBAHue'];
};

/** Input type representing a RGBA color value: https://developer.mozilla.org/en-US/docs/Web/CSS/color_value#rgb()_and_rgba() */
export type RgbaInput = {
  a: Scalars['RGBATransparency'];
  b: Scalars['RGBAHue'];
  g: Scalars['RGBAHue'];
  r: Scalars['RGBAHue'];
};

/** Armazena dados de rendas e despesas */
export type Revenue = Node & {
  __typename?: 'Revenue';
  amount: Scalars['Float'];
  bank?: Maybe<Scalars['String']>;
  /** The time the document was created */
  createdAt: Scalars['DateTime'];
  /** User that created this document */
  createdBy?: Maybe<User>;
  currency: Scalars['String'];
  date: Scalars['Date'];
  deleted?: Maybe<Scalars['Boolean']>;
  description: Scalars['String'];
  /** Get the document in other stages */
  documentInStages: Array<Revenue>;
  /** List of Revenue versions */
  history: Array<Version>;
  /** The unique identifier */
  id: Scalars['ID'];
  itemStatus: Scalars['Int'];
  payment?: Maybe<Wallet>;
  /** The time the document was published. Null on documents in draft stage. */
  publishedAt?: Maybe<Scalars['DateTime']>;
  /** User that last published this document */
  publishedBy?: Maybe<User>;
  scheduledIn: Array<ScheduledOperation>;
  /** System stage field */
  stage: Stage;
  type: Scalars['String'];
  /** The time the document was updated */
  updatedAt: Scalars['DateTime'];
  /** User that last updated this document */
  updatedBy?: Maybe<User>;
};

/** Armazena dados de rendas e despesas */
export type RevenueCreatedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  locales?: InputMaybe<Array<Locale>>;
};

/** Armazena dados de rendas e despesas */
export type RevenueDocumentInStagesArgs = {
  includeCurrent?: Scalars['Boolean'];
  inheritLocale?: Scalars['Boolean'];
  stages?: Array<Stage>;
};

/** Armazena dados de rendas e despesas */
export type RevenueHistoryArgs = {
  limit?: Scalars['Int'];
  skip?: Scalars['Int'];
  stageOverride?: InputMaybe<Stage>;
};

/** Armazena dados de rendas e despesas */
export type RevenuePaymentArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  locales?: InputMaybe<Array<Locale>>;
};

/** Armazena dados de rendas e despesas */
export type RevenuePublishedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  locales?: InputMaybe<Array<Locale>>;
};

/** Armazena dados de rendas e despesas */
export type RevenueScheduledInArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: InputMaybe<Array<Locale>>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ScheduledOperationWhereInput>;
};

/** Armazena dados de rendas e despesas */
export type RevenueUpdatedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  locales?: InputMaybe<Array<Locale>>;
};

export type RevenueConnectInput = {
  /** Allow to specify document position in list of connected documents, will default to appending at end of list */
  position?: InputMaybe<ConnectPositionInput>;
  /** Document to connect */
  where: RevenueWhereUniqueInput;
};

/** A connection to a list of items. */
export type RevenueConnection = {
  __typename?: 'RevenueConnection';
  aggregate: Aggregate;
  /** A list of edges. */
  edges: Array<RevenueEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

export type RevenueCreateInput = {
  amount: Scalars['Float'];
  bank?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  currency: Scalars['String'];
  date: Scalars['Date'];
  deleted?: InputMaybe<Scalars['Boolean']>;
  description: Scalars['String'];
  itemStatus: Scalars['Int'];
  payment?: InputMaybe<WalletCreateOneInlineInput>;
  type: Scalars['String'];
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type RevenueCreateManyInlineInput = {
  /** Connect multiple existing Revenue documents */
  connect?: InputMaybe<Array<RevenueWhereUniqueInput>>;
  /** Create and connect multiple existing Revenue documents */
  create?: InputMaybe<Array<RevenueCreateInput>>;
};

export type RevenueCreateOneInlineInput = {
  /** Connect one existing Revenue document */
  connect?: InputMaybe<RevenueWhereUniqueInput>;
  /** Create and connect one Revenue document */
  create?: InputMaybe<RevenueCreateInput>;
};

/** An edge in a connection. */
export type RevenueEdge = {
  __typename?: 'RevenueEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: Revenue;
};

/** Identifies documents */
export type RevenueManyWhereInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<RevenueWhereInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<RevenueWhereInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<RevenueWhereInput>>;
  /** Contains search across all appropriate fields. */
  _search?: InputMaybe<Scalars['String']>;
  amount?: InputMaybe<Scalars['Float']>;
  /** All values greater than the given value. */
  amount_gt?: InputMaybe<Scalars['Float']>;
  /** All values greater than or equal the given value. */
  amount_gte?: InputMaybe<Scalars['Float']>;
  /** All values that are contained in given list. */
  amount_in?: InputMaybe<Array<InputMaybe<Scalars['Float']>>>;
  /** All values less than the given value. */
  amount_lt?: InputMaybe<Scalars['Float']>;
  /** All values less than or equal the given value. */
  amount_lte?: InputMaybe<Scalars['Float']>;
  /** Any other value that exists and is not equal to the given value. */
  amount_not?: InputMaybe<Scalars['Float']>;
  /** All values that are not contained in given list. */
  amount_not_in?: InputMaybe<Array<InputMaybe<Scalars['Float']>>>;
  bank?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  bank_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  bank_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  bank_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Any other value that exists and is not equal to the given value. */
  bank_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  bank_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  bank_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  bank_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  bank_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  bank_starts_with?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  createdAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  createdAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  createdAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  createdAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  createdAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** Any other value that exists and is not equal to the given value. */
  createdAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  createdAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  createdBy?: InputMaybe<UserWhereInput>;
  currency?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  currency_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  currency_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  currency_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Any other value that exists and is not equal to the given value. */
  currency_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  currency_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  currency_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  currency_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  currency_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  currency_starts_with?: InputMaybe<Scalars['String']>;
  date?: InputMaybe<Scalars['Date']>;
  /** All values greater than the given value. */
  date_gt?: InputMaybe<Scalars['Date']>;
  /** All values greater than or equal the given value. */
  date_gte?: InputMaybe<Scalars['Date']>;
  /** All values that are contained in given list. */
  date_in?: InputMaybe<Array<InputMaybe<Scalars['Date']>>>;
  /** All values less than the given value. */
  date_lt?: InputMaybe<Scalars['Date']>;
  /** All values less than or equal the given value. */
  date_lte?: InputMaybe<Scalars['Date']>;
  /** Any other value that exists and is not equal to the given value. */
  date_not?: InputMaybe<Scalars['Date']>;
  /** All values that are not contained in given list. */
  date_not_in?: InputMaybe<Array<InputMaybe<Scalars['Date']>>>;
  deleted?: InputMaybe<Scalars['Boolean']>;
  /** Any other value that exists and is not equal to the given value. */
  deleted_not?: InputMaybe<Scalars['Boolean']>;
  description?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  description_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  description_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  description_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Any other value that exists and is not equal to the given value. */
  description_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  description_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  description_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  description_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  description_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  description_starts_with?: InputMaybe<Scalars['String']>;
  documentInStages_every?: InputMaybe<RevenueWhereStageInput>;
  documentInStages_none?: InputMaybe<RevenueWhereStageInput>;
  documentInStages_some?: InputMaybe<RevenueWhereStageInput>;
  id?: InputMaybe<Scalars['ID']>;
  /** All values containing the given string. */
  id_contains?: InputMaybe<Scalars['ID']>;
  /** All values ending with the given string. */
  id_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are contained in given list. */
  id_in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Any other value that exists and is not equal to the given value. */
  id_not?: InputMaybe<Scalars['ID']>;
  /** All values not containing the given string. */
  id_not_contains?: InputMaybe<Scalars['ID']>;
  /** All values not ending with the given string */
  id_not_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are not contained in given list. */
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** All values not starting with the given string. */
  id_not_starts_with?: InputMaybe<Scalars['ID']>;
  /** All values starting with the given string. */
  id_starts_with?: InputMaybe<Scalars['ID']>;
  itemStatus?: InputMaybe<Scalars['Int']>;
  /** All values greater than the given value. */
  itemStatus_gt?: InputMaybe<Scalars['Int']>;
  /** All values greater than or equal the given value. */
  itemStatus_gte?: InputMaybe<Scalars['Int']>;
  /** All values that are contained in given list. */
  itemStatus_in?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  /** All values less than the given value. */
  itemStatus_lt?: InputMaybe<Scalars['Int']>;
  /** All values less than or equal the given value. */
  itemStatus_lte?: InputMaybe<Scalars['Int']>;
  /** Any other value that exists and is not equal to the given value. */
  itemStatus_not?: InputMaybe<Scalars['Int']>;
  /** All values that are not contained in given list. */
  itemStatus_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  payment?: InputMaybe<WalletWhereInput>;
  publishedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  publishedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  publishedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  publishedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  publishedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  publishedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** Any other value that exists and is not equal to the given value. */
  publishedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  publishedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  publishedBy?: InputMaybe<UserWhereInput>;
  scheduledIn_every?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_none?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_some?: InputMaybe<ScheduledOperationWhereInput>;
  type?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  type_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  type_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  type_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Any other value that exists and is not equal to the given value. */
  type_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  type_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  type_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  type_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  type_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  type_starts_with?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  updatedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  updatedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  updatedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  updatedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  updatedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** Any other value that exists and is not equal to the given value. */
  updatedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  updatedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  updatedBy?: InputMaybe<UserWhereInput>;
};

export enum RevenueOrderByInput {
  AmountAsc = 'amount_ASC',
  AmountDesc = 'amount_DESC',
  BankAsc = 'bank_ASC',
  BankDesc = 'bank_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  CurrencyAsc = 'currency_ASC',
  CurrencyDesc = 'currency_DESC',
  DateAsc = 'date_ASC',
  DateDesc = 'date_DESC',
  DeletedAsc = 'deleted_ASC',
  DeletedDesc = 'deleted_DESC',
  DescriptionAsc = 'description_ASC',
  DescriptionDesc = 'description_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  ItemStatusAsc = 'itemStatus_ASC',
  ItemStatusDesc = 'itemStatus_DESC',
  PublishedAtAsc = 'publishedAt_ASC',
  PublishedAtDesc = 'publishedAt_DESC',
  TypeAsc = 'type_ASC',
  TypeDesc = 'type_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
}

export type RevenueUpdateInput = {
  amount?: InputMaybe<Scalars['Float']>;
  bank?: InputMaybe<Scalars['String']>;
  currency?: InputMaybe<Scalars['String']>;
  date?: InputMaybe<Scalars['Date']>;
  deleted?: InputMaybe<Scalars['Boolean']>;
  description?: InputMaybe<Scalars['String']>;
  itemStatus?: InputMaybe<Scalars['Int']>;
  payment?: InputMaybe<WalletUpdateOneInlineInput>;
  type?: InputMaybe<Scalars['String']>;
};

export type RevenueUpdateManyInlineInput = {
  /** Connect multiple existing Revenue documents */
  connect?: InputMaybe<Array<RevenueConnectInput>>;
  /** Create and connect multiple Revenue documents */
  create?: InputMaybe<Array<RevenueCreateInput>>;
  /** Delete multiple Revenue documents */
  delete?: InputMaybe<Array<RevenueWhereUniqueInput>>;
  /** Disconnect multiple Revenue documents */
  disconnect?: InputMaybe<Array<RevenueWhereUniqueInput>>;
  /** Override currently-connected documents with multiple existing Revenue documents */
  set?: InputMaybe<Array<RevenueWhereUniqueInput>>;
  /** Update multiple Revenue documents */
  update?: InputMaybe<Array<RevenueUpdateWithNestedWhereUniqueInput>>;
  /** Upsert multiple Revenue documents */
  upsert?: InputMaybe<Array<RevenueUpsertWithNestedWhereUniqueInput>>;
};

export type RevenueUpdateManyInput = {
  amount?: InputMaybe<Scalars['Float']>;
  bank?: InputMaybe<Scalars['String']>;
  currency?: InputMaybe<Scalars['String']>;
  date?: InputMaybe<Scalars['Date']>;
  deleted?: InputMaybe<Scalars['Boolean']>;
  description?: InputMaybe<Scalars['String']>;
  itemStatus?: InputMaybe<Scalars['Int']>;
  type?: InputMaybe<Scalars['String']>;
};

export type RevenueUpdateManyWithNestedWhereInput = {
  /** Update many input */
  data: RevenueUpdateManyInput;
  /** Document search */
  where: RevenueWhereInput;
};

export type RevenueUpdateOneInlineInput = {
  /** Connect existing Revenue document */
  connect?: InputMaybe<RevenueWhereUniqueInput>;
  /** Create and connect one Revenue document */
  create?: InputMaybe<RevenueCreateInput>;
  /** Delete currently connected Revenue document */
  delete?: InputMaybe<Scalars['Boolean']>;
  /** Disconnect currently connected Revenue document */
  disconnect?: InputMaybe<Scalars['Boolean']>;
  /** Update single Revenue document */
  update?: InputMaybe<RevenueUpdateWithNestedWhereUniqueInput>;
  /** Upsert single Revenue document */
  upsert?: InputMaybe<RevenueUpsertWithNestedWhereUniqueInput>;
};

export type RevenueUpdateWithNestedWhereUniqueInput = {
  /** Document to update */
  data: RevenueUpdateInput;
  /** Unique document search */
  where: RevenueWhereUniqueInput;
};

export type RevenueUpsertInput = {
  /** Create document if it didn't exist */
  create: RevenueCreateInput;
  /** Update document if it exists */
  update: RevenueUpdateInput;
};

export type RevenueUpsertWithNestedWhereUniqueInput = {
  /** Upsert data */
  data: RevenueUpsertInput;
  /** Unique document search */
  where: RevenueWhereUniqueInput;
};

/** This contains a set of filters that can be used to compare values internally */
export type RevenueWhereComparatorInput = {
  /** This field can be used to request to check if the entry is outdated by internal comparison */
  outdated_to?: InputMaybe<Scalars['Boolean']>;
};

/** Identifies documents */
export type RevenueWhereInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<RevenueWhereInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<RevenueWhereInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<RevenueWhereInput>>;
  /** Contains search across all appropriate fields. */
  _search?: InputMaybe<Scalars['String']>;
  amount?: InputMaybe<Scalars['Float']>;
  /** All values greater than the given value. */
  amount_gt?: InputMaybe<Scalars['Float']>;
  /** All values greater than or equal the given value. */
  amount_gte?: InputMaybe<Scalars['Float']>;
  /** All values that are contained in given list. */
  amount_in?: InputMaybe<Array<InputMaybe<Scalars['Float']>>>;
  /** All values less than the given value. */
  amount_lt?: InputMaybe<Scalars['Float']>;
  /** All values less than or equal the given value. */
  amount_lte?: InputMaybe<Scalars['Float']>;
  /** Any other value that exists and is not equal to the given value. */
  amount_not?: InputMaybe<Scalars['Float']>;
  /** All values that are not contained in given list. */
  amount_not_in?: InputMaybe<Array<InputMaybe<Scalars['Float']>>>;
  bank?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  bank_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  bank_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  bank_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Any other value that exists and is not equal to the given value. */
  bank_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  bank_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  bank_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  bank_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  bank_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  bank_starts_with?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  createdAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  createdAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  createdAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  createdAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  createdAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** Any other value that exists and is not equal to the given value. */
  createdAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  createdAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  createdBy?: InputMaybe<UserWhereInput>;
  currency?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  currency_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  currency_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  currency_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Any other value that exists and is not equal to the given value. */
  currency_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  currency_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  currency_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  currency_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  currency_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  currency_starts_with?: InputMaybe<Scalars['String']>;
  date?: InputMaybe<Scalars['Date']>;
  /** All values greater than the given value. */
  date_gt?: InputMaybe<Scalars['Date']>;
  /** All values greater than or equal the given value. */
  date_gte?: InputMaybe<Scalars['Date']>;
  /** All values that are contained in given list. */
  date_in?: InputMaybe<Array<InputMaybe<Scalars['Date']>>>;
  /** All values less than the given value. */
  date_lt?: InputMaybe<Scalars['Date']>;
  /** All values less than or equal the given value. */
  date_lte?: InputMaybe<Scalars['Date']>;
  /** Any other value that exists and is not equal to the given value. */
  date_not?: InputMaybe<Scalars['Date']>;
  /** All values that are not contained in given list. */
  date_not_in?: InputMaybe<Array<InputMaybe<Scalars['Date']>>>;
  deleted?: InputMaybe<Scalars['Boolean']>;
  /** Any other value that exists and is not equal to the given value. */
  deleted_not?: InputMaybe<Scalars['Boolean']>;
  description?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  description_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  description_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  description_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Any other value that exists and is not equal to the given value. */
  description_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  description_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  description_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  description_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  description_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  description_starts_with?: InputMaybe<Scalars['String']>;
  documentInStages_every?: InputMaybe<RevenueWhereStageInput>;
  documentInStages_none?: InputMaybe<RevenueWhereStageInput>;
  documentInStages_some?: InputMaybe<RevenueWhereStageInput>;
  id?: InputMaybe<Scalars['ID']>;
  /** All values containing the given string. */
  id_contains?: InputMaybe<Scalars['ID']>;
  /** All values ending with the given string. */
  id_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are contained in given list. */
  id_in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Any other value that exists and is not equal to the given value. */
  id_not?: InputMaybe<Scalars['ID']>;
  /** All values not containing the given string. */
  id_not_contains?: InputMaybe<Scalars['ID']>;
  /** All values not ending with the given string */
  id_not_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are not contained in given list. */
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** All values not starting with the given string. */
  id_not_starts_with?: InputMaybe<Scalars['ID']>;
  /** All values starting with the given string. */
  id_starts_with?: InputMaybe<Scalars['ID']>;
  itemStatus?: InputMaybe<Scalars['Int']>;
  /** All values greater than the given value. */
  itemStatus_gt?: InputMaybe<Scalars['Int']>;
  /** All values greater than or equal the given value. */
  itemStatus_gte?: InputMaybe<Scalars['Int']>;
  /** All values that are contained in given list. */
  itemStatus_in?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  /** All values less than the given value. */
  itemStatus_lt?: InputMaybe<Scalars['Int']>;
  /** All values less than or equal the given value. */
  itemStatus_lte?: InputMaybe<Scalars['Int']>;
  /** Any other value that exists and is not equal to the given value. */
  itemStatus_not?: InputMaybe<Scalars['Int']>;
  /** All values that are not contained in given list. */
  itemStatus_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  payment?: InputMaybe<WalletWhereInput>;
  publishedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  publishedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  publishedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  publishedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  publishedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  publishedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** Any other value that exists and is not equal to the given value. */
  publishedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  publishedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  publishedBy?: InputMaybe<UserWhereInput>;
  scheduledIn_every?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_none?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_some?: InputMaybe<ScheduledOperationWhereInput>;
  type?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  type_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  type_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  type_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Any other value that exists and is not equal to the given value. */
  type_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  type_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  type_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  type_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  type_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  type_starts_with?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  updatedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  updatedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  updatedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  updatedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  updatedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** Any other value that exists and is not equal to the given value. */
  updatedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  updatedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  updatedBy?: InputMaybe<UserWhereInput>;
};

/** The document in stages filter allows specifying a stage entry to cross compare the same document between different stages */
export type RevenueWhereStageInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<RevenueWhereStageInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<RevenueWhereStageInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<RevenueWhereStageInput>>;
  /** This field contains fields which can be set as true or false to specify an internal comparison */
  compareWithParent?: InputMaybe<RevenueWhereComparatorInput>;
  /** Specify the stage to compare with */
  stage?: InputMaybe<Stage>;
};

/** References Revenue record uniquely */
export type RevenueWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']>;
};

/** Custom type representing a rich text value comprising of raw rich text ast, html, markdown and text values */
export type RichText = {
  __typename?: 'RichText';
  /** Returns HTMl representation */
  html: Scalars['String'];
  /** Returns Markdown representation */
  markdown: Scalars['String'];
  /** Returns AST representation */
  raw: Scalars['RichTextAST'];
  /** Returns plain-text contents of RichText */
  text: Scalars['String'];
};

/** Scheduled Operation system model */
export type ScheduledOperation = Node & {
  __typename?: 'ScheduledOperation';
  affectedDocuments: Array<ScheduledOperationAffectedDocument>;
  /** The time the document was created */
  createdAt: Scalars['DateTime'];
  /** User that created this document */
  createdBy?: Maybe<User>;
  /** Operation description */
  description?: Maybe<Scalars['String']>;
  /** Get the document in other stages */
  documentInStages: Array<ScheduledOperation>;
  /** Operation error message */
  errorMessage?: Maybe<Scalars['String']>;
  /** The unique identifier */
  id: Scalars['ID'];
  /** The time the document was published. Null on documents in draft stage. */
  publishedAt?: Maybe<Scalars['DateTime']>;
  /** User that last published this document */
  publishedBy?: Maybe<User>;
  /** Raw operation payload including all details, this field is subject to change */
  rawPayload: Scalars['Json'];
  /** The release this operation is scheduled for */
  release?: Maybe<ScheduledRelease>;
  /** System stage field */
  stage: Stage;
  /** operation Status */
  status: ScheduledOperationStatus;
  /** The time the document was updated */
  updatedAt: Scalars['DateTime'];
  /** User that last updated this document */
  updatedBy?: Maybe<User>;
};

/** Scheduled Operation system model */
export type ScheduledOperationAffectedDocumentsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: InputMaybe<Array<Locale>>;
  skip?: InputMaybe<Scalars['Int']>;
};

/** Scheduled Operation system model */
export type ScheduledOperationCreatedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  locales?: InputMaybe<Array<Locale>>;
};

/** Scheduled Operation system model */
export type ScheduledOperationDocumentInStagesArgs = {
  includeCurrent?: Scalars['Boolean'];
  inheritLocale?: Scalars['Boolean'];
  stages?: Array<Stage>;
};

/** Scheduled Operation system model */
export type ScheduledOperationPublishedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  locales?: InputMaybe<Array<Locale>>;
};

/** Scheduled Operation system model */
export type ScheduledOperationReleaseArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  locales?: InputMaybe<Array<Locale>>;
};

/** Scheduled Operation system model */
export type ScheduledOperationUpdatedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  locales?: InputMaybe<Array<Locale>>;
};

export type ScheduledOperationAffectedDocument =
  | Account
  | Asset
  | Category
  | Expense
  | Revenue
  | Transaction
  | Wallet
  | Wish;

export type ScheduledOperationConnectInput = {
  /** Allow to specify document position in list of connected documents, will default to appending at end of list */
  position?: InputMaybe<ConnectPositionInput>;
  /** Document to connect */
  where: ScheduledOperationWhereUniqueInput;
};

/** A connection to a list of items. */
export type ScheduledOperationConnection = {
  __typename?: 'ScheduledOperationConnection';
  aggregate: Aggregate;
  /** A list of edges. */
  edges: Array<ScheduledOperationEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

export type ScheduledOperationCreateManyInlineInput = {
  /** Connect multiple existing ScheduledOperation documents */
  connect?: InputMaybe<Array<ScheduledOperationWhereUniqueInput>>;
};

export type ScheduledOperationCreateOneInlineInput = {
  /** Connect one existing ScheduledOperation document */
  connect?: InputMaybe<ScheduledOperationWhereUniqueInput>;
};

/** An edge in a connection. */
export type ScheduledOperationEdge = {
  __typename?: 'ScheduledOperationEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: ScheduledOperation;
};

/** Identifies documents */
export type ScheduledOperationManyWhereInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<ScheduledOperationWhereInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<ScheduledOperationWhereInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<ScheduledOperationWhereInput>>;
  /** Contains search across all appropriate fields. */
  _search?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  createdAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  createdAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  createdAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  createdAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  createdAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** Any other value that exists and is not equal to the given value. */
  createdAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  createdAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  createdBy?: InputMaybe<UserWhereInput>;
  description?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  description_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  description_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  description_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Any other value that exists and is not equal to the given value. */
  description_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  description_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  description_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  description_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  description_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  description_starts_with?: InputMaybe<Scalars['String']>;
  errorMessage?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  errorMessage_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  errorMessage_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  errorMessage_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Any other value that exists and is not equal to the given value. */
  errorMessage_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  errorMessage_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  errorMessage_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  errorMessage_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  errorMessage_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  errorMessage_starts_with?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  /** All values containing the given string. */
  id_contains?: InputMaybe<Scalars['ID']>;
  /** All values ending with the given string. */
  id_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are contained in given list. */
  id_in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Any other value that exists and is not equal to the given value. */
  id_not?: InputMaybe<Scalars['ID']>;
  /** All values not containing the given string. */
  id_not_contains?: InputMaybe<Scalars['ID']>;
  /** All values not ending with the given string */
  id_not_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are not contained in given list. */
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** All values not starting with the given string. */
  id_not_starts_with?: InputMaybe<Scalars['ID']>;
  /** All values starting with the given string. */
  id_starts_with?: InputMaybe<Scalars['ID']>;
  publishedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  publishedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  publishedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  publishedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  publishedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  publishedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** Any other value that exists and is not equal to the given value. */
  publishedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  publishedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  publishedBy?: InputMaybe<UserWhereInput>;
  /** All values containing the given json path. */
  rawPayload_json_path_exists?: InputMaybe<Scalars['String']>;
  /**
   * Recursively tries to find the provided JSON scalar value inside the field.
   * It does use an exact match when comparing values.
   * If you pass `null` as value the filter will be ignored.
   * Note: This filter fails if you try to look for a non scalar JSON value!
   */
  rawPayload_value_recursive?: InputMaybe<Scalars['Json']>;
  release?: InputMaybe<ScheduledReleaseWhereInput>;
  status?: InputMaybe<ScheduledOperationStatus>;
  /** All values that are contained in given list. */
  status_in?: InputMaybe<Array<InputMaybe<ScheduledOperationStatus>>>;
  /** Any other value that exists and is not equal to the given value. */
  status_not?: InputMaybe<ScheduledOperationStatus>;
  /** All values that are not contained in given list. */
  status_not_in?: InputMaybe<Array<InputMaybe<ScheduledOperationStatus>>>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  updatedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  updatedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  updatedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  updatedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  updatedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** Any other value that exists and is not equal to the given value. */
  updatedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  updatedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  updatedBy?: InputMaybe<UserWhereInput>;
};

export enum ScheduledOperationOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  DescriptionAsc = 'description_ASC',
  DescriptionDesc = 'description_DESC',
  ErrorMessageAsc = 'errorMessage_ASC',
  ErrorMessageDesc = 'errorMessage_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  PublishedAtAsc = 'publishedAt_ASC',
  PublishedAtDesc = 'publishedAt_DESC',
  StatusAsc = 'status_ASC',
  StatusDesc = 'status_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
}

/** System Scheduled Operation Status */
export enum ScheduledOperationStatus {
  Canceled = 'CANCELED',
  Completed = 'COMPLETED',
  Failed = 'FAILED',
  InProgress = 'IN_PROGRESS',
  Pending = 'PENDING',
}

export type ScheduledOperationUpdateManyInlineInput = {
  /** Connect multiple existing ScheduledOperation documents */
  connect?: InputMaybe<Array<ScheduledOperationConnectInput>>;
  /** Disconnect multiple ScheduledOperation documents */
  disconnect?: InputMaybe<Array<ScheduledOperationWhereUniqueInput>>;
  /** Override currently-connected documents with multiple existing ScheduledOperation documents */
  set?: InputMaybe<Array<ScheduledOperationWhereUniqueInput>>;
};

export type ScheduledOperationUpdateOneInlineInput = {
  /** Connect existing ScheduledOperation document */
  connect?: InputMaybe<ScheduledOperationWhereUniqueInput>;
  /** Disconnect currently connected ScheduledOperation document */
  disconnect?: InputMaybe<Scalars['Boolean']>;
};

/** Identifies documents */
export type ScheduledOperationWhereInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<ScheduledOperationWhereInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<ScheduledOperationWhereInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<ScheduledOperationWhereInput>>;
  /** Contains search across all appropriate fields. */
  _search?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  createdAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  createdAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  createdAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  createdAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  createdAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** Any other value that exists and is not equal to the given value. */
  createdAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  createdAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  createdBy?: InputMaybe<UserWhereInput>;
  description?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  description_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  description_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  description_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Any other value that exists and is not equal to the given value. */
  description_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  description_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  description_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  description_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  description_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  description_starts_with?: InputMaybe<Scalars['String']>;
  errorMessage?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  errorMessage_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  errorMessage_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  errorMessage_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Any other value that exists and is not equal to the given value. */
  errorMessage_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  errorMessage_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  errorMessage_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  errorMessage_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  errorMessage_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  errorMessage_starts_with?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  /** All values containing the given string. */
  id_contains?: InputMaybe<Scalars['ID']>;
  /** All values ending with the given string. */
  id_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are contained in given list. */
  id_in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Any other value that exists and is not equal to the given value. */
  id_not?: InputMaybe<Scalars['ID']>;
  /** All values not containing the given string. */
  id_not_contains?: InputMaybe<Scalars['ID']>;
  /** All values not ending with the given string */
  id_not_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are not contained in given list. */
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** All values not starting with the given string. */
  id_not_starts_with?: InputMaybe<Scalars['ID']>;
  /** All values starting with the given string. */
  id_starts_with?: InputMaybe<Scalars['ID']>;
  publishedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  publishedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  publishedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  publishedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  publishedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  publishedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** Any other value that exists and is not equal to the given value. */
  publishedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  publishedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  publishedBy?: InputMaybe<UserWhereInput>;
  /** All values containing the given json path. */
  rawPayload_json_path_exists?: InputMaybe<Scalars['String']>;
  /**
   * Recursively tries to find the provided JSON scalar value inside the field.
   * It does use an exact match when comparing values.
   * If you pass `null` as value the filter will be ignored.
   * Note: This filter fails if you try to look for a non scalar JSON value!
   */
  rawPayload_value_recursive?: InputMaybe<Scalars['Json']>;
  release?: InputMaybe<ScheduledReleaseWhereInput>;
  status?: InputMaybe<ScheduledOperationStatus>;
  /** All values that are contained in given list. */
  status_in?: InputMaybe<Array<InputMaybe<ScheduledOperationStatus>>>;
  /** Any other value that exists and is not equal to the given value. */
  status_not?: InputMaybe<ScheduledOperationStatus>;
  /** All values that are not contained in given list. */
  status_not_in?: InputMaybe<Array<InputMaybe<ScheduledOperationStatus>>>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  updatedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  updatedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  updatedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  updatedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  updatedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** Any other value that exists and is not equal to the given value. */
  updatedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  updatedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  updatedBy?: InputMaybe<UserWhereInput>;
};

/** References ScheduledOperation record uniquely */
export type ScheduledOperationWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']>;
};

/** Scheduled Release system model */
export type ScheduledRelease = Node & {
  __typename?: 'ScheduledRelease';
  /** The time the document was created */
  createdAt: Scalars['DateTime'];
  /** User that created this document */
  createdBy?: Maybe<User>;
  /** Release description */
  description?: Maybe<Scalars['String']>;
  /** Get the document in other stages */
  documentInStages: Array<ScheduledRelease>;
  /** Release error message */
  errorMessage?: Maybe<Scalars['String']>;
  /** The unique identifier */
  id: Scalars['ID'];
  /** Whether scheduled release should be run */
  isActive: Scalars['Boolean'];
  /** Whether scheduled release is implicit */
  isImplicit: Scalars['Boolean'];
  /** Operations to run with this release */
  operations: Array<ScheduledOperation>;
  /** The time the document was published. Null on documents in draft stage. */
  publishedAt?: Maybe<Scalars['DateTime']>;
  /** User that last published this document */
  publishedBy?: Maybe<User>;
  /** Release date and time */
  releaseAt?: Maybe<Scalars['DateTime']>;
  /** System stage field */
  stage: Stage;
  /** Release Status */
  status: ScheduledReleaseStatus;
  /** Release Title */
  title?: Maybe<Scalars['String']>;
  /** The time the document was updated */
  updatedAt: Scalars['DateTime'];
  /** User that last updated this document */
  updatedBy?: Maybe<User>;
};

/** Scheduled Release system model */
export type ScheduledReleaseCreatedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  locales?: InputMaybe<Array<Locale>>;
};

/** Scheduled Release system model */
export type ScheduledReleaseDocumentInStagesArgs = {
  includeCurrent?: Scalars['Boolean'];
  inheritLocale?: Scalars['Boolean'];
  stages?: Array<Stage>;
};

/** Scheduled Release system model */
export type ScheduledReleaseOperationsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: InputMaybe<Array<Locale>>;
  orderBy?: InputMaybe<ScheduledOperationOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ScheduledOperationWhereInput>;
};

/** Scheduled Release system model */
export type ScheduledReleasePublishedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  locales?: InputMaybe<Array<Locale>>;
};

/** Scheduled Release system model */
export type ScheduledReleaseUpdatedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  locales?: InputMaybe<Array<Locale>>;
};

export type ScheduledReleaseConnectInput = {
  /** Allow to specify document position in list of connected documents, will default to appending at end of list */
  position?: InputMaybe<ConnectPositionInput>;
  /** Document to connect */
  where: ScheduledReleaseWhereUniqueInput;
};

/** A connection to a list of items. */
export type ScheduledReleaseConnection = {
  __typename?: 'ScheduledReleaseConnection';
  aggregate: Aggregate;
  /** A list of edges. */
  edges: Array<ScheduledReleaseEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

export type ScheduledReleaseCreateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  description?: InputMaybe<Scalars['String']>;
  errorMessage?: InputMaybe<Scalars['String']>;
  isActive?: InputMaybe<Scalars['Boolean']>;
  releaseAt?: InputMaybe<Scalars['DateTime']>;
  title?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type ScheduledReleaseCreateManyInlineInput = {
  /** Connect multiple existing ScheduledRelease documents */
  connect?: InputMaybe<Array<ScheduledReleaseWhereUniqueInput>>;
  /** Create and connect multiple existing ScheduledRelease documents */
  create?: InputMaybe<Array<ScheduledReleaseCreateInput>>;
};

export type ScheduledReleaseCreateOneInlineInput = {
  /** Connect one existing ScheduledRelease document */
  connect?: InputMaybe<ScheduledReleaseWhereUniqueInput>;
  /** Create and connect one ScheduledRelease document */
  create?: InputMaybe<ScheduledReleaseCreateInput>;
};

/** An edge in a connection. */
export type ScheduledReleaseEdge = {
  __typename?: 'ScheduledReleaseEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: ScheduledRelease;
};

/** Identifies documents */
export type ScheduledReleaseManyWhereInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<ScheduledReleaseWhereInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<ScheduledReleaseWhereInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<ScheduledReleaseWhereInput>>;
  /** Contains search across all appropriate fields. */
  _search?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  createdAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  createdAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  createdAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  createdAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  createdAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** Any other value that exists and is not equal to the given value. */
  createdAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  createdAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  createdBy?: InputMaybe<UserWhereInput>;
  description?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  description_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  description_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  description_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Any other value that exists and is not equal to the given value. */
  description_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  description_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  description_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  description_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  description_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  description_starts_with?: InputMaybe<Scalars['String']>;
  errorMessage?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  errorMessage_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  errorMessage_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  errorMessage_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Any other value that exists and is not equal to the given value. */
  errorMessage_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  errorMessage_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  errorMessage_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  errorMessage_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  errorMessage_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  errorMessage_starts_with?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  /** All values containing the given string. */
  id_contains?: InputMaybe<Scalars['ID']>;
  /** All values ending with the given string. */
  id_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are contained in given list. */
  id_in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Any other value that exists and is not equal to the given value. */
  id_not?: InputMaybe<Scalars['ID']>;
  /** All values not containing the given string. */
  id_not_contains?: InputMaybe<Scalars['ID']>;
  /** All values not ending with the given string */
  id_not_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are not contained in given list. */
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** All values not starting with the given string. */
  id_not_starts_with?: InputMaybe<Scalars['ID']>;
  /** All values starting with the given string. */
  id_starts_with?: InputMaybe<Scalars['ID']>;
  isActive?: InputMaybe<Scalars['Boolean']>;
  /** Any other value that exists and is not equal to the given value. */
  isActive_not?: InputMaybe<Scalars['Boolean']>;
  isImplicit?: InputMaybe<Scalars['Boolean']>;
  /** Any other value that exists and is not equal to the given value. */
  isImplicit_not?: InputMaybe<Scalars['Boolean']>;
  operations_every?: InputMaybe<ScheduledOperationWhereInput>;
  operations_none?: InputMaybe<ScheduledOperationWhereInput>;
  operations_some?: InputMaybe<ScheduledOperationWhereInput>;
  publishedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  publishedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  publishedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  publishedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  publishedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  publishedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** Any other value that exists and is not equal to the given value. */
  publishedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  publishedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  publishedBy?: InputMaybe<UserWhereInput>;
  releaseAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  releaseAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  releaseAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  releaseAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  releaseAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  releaseAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** Any other value that exists and is not equal to the given value. */
  releaseAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  releaseAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  status?: InputMaybe<ScheduledReleaseStatus>;
  /** All values that are contained in given list. */
  status_in?: InputMaybe<Array<InputMaybe<ScheduledReleaseStatus>>>;
  /** Any other value that exists and is not equal to the given value. */
  status_not?: InputMaybe<ScheduledReleaseStatus>;
  /** All values that are not contained in given list. */
  status_not_in?: InputMaybe<Array<InputMaybe<ScheduledReleaseStatus>>>;
  title?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  title_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  title_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  title_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Any other value that exists and is not equal to the given value. */
  title_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  title_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  title_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  title_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  title_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  title_starts_with?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  updatedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  updatedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  updatedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  updatedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  updatedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** Any other value that exists and is not equal to the given value. */
  updatedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  updatedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  updatedBy?: InputMaybe<UserWhereInput>;
};

export enum ScheduledReleaseOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  DescriptionAsc = 'description_ASC',
  DescriptionDesc = 'description_DESC',
  ErrorMessageAsc = 'errorMessage_ASC',
  ErrorMessageDesc = 'errorMessage_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  IsActiveAsc = 'isActive_ASC',
  IsActiveDesc = 'isActive_DESC',
  IsImplicitAsc = 'isImplicit_ASC',
  IsImplicitDesc = 'isImplicit_DESC',
  PublishedAtAsc = 'publishedAt_ASC',
  PublishedAtDesc = 'publishedAt_DESC',
  ReleaseAtAsc = 'releaseAt_ASC',
  ReleaseAtDesc = 'releaseAt_DESC',
  StatusAsc = 'status_ASC',
  StatusDesc = 'status_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
}

/** System Scheduled Release Status */
export enum ScheduledReleaseStatus {
  Completed = 'COMPLETED',
  Failed = 'FAILED',
  InProgress = 'IN_PROGRESS',
  Pending = 'PENDING',
}

export type ScheduledReleaseUpdateInput = {
  description?: InputMaybe<Scalars['String']>;
  errorMessage?: InputMaybe<Scalars['String']>;
  isActive?: InputMaybe<Scalars['Boolean']>;
  releaseAt?: InputMaybe<Scalars['DateTime']>;
  title?: InputMaybe<Scalars['String']>;
};

export type ScheduledReleaseUpdateManyInlineInput = {
  /** Connect multiple existing ScheduledRelease documents */
  connect?: InputMaybe<Array<ScheduledReleaseConnectInput>>;
  /** Create and connect multiple ScheduledRelease documents */
  create?: InputMaybe<Array<ScheduledReleaseCreateInput>>;
  /** Delete multiple ScheduledRelease documents */
  delete?: InputMaybe<Array<ScheduledReleaseWhereUniqueInput>>;
  /** Disconnect multiple ScheduledRelease documents */
  disconnect?: InputMaybe<Array<ScheduledReleaseWhereUniqueInput>>;
  /** Override currently-connected documents with multiple existing ScheduledRelease documents */
  set?: InputMaybe<Array<ScheduledReleaseWhereUniqueInput>>;
  /** Update multiple ScheduledRelease documents */
  update?: InputMaybe<Array<ScheduledReleaseUpdateWithNestedWhereUniqueInput>>;
  /** Upsert multiple ScheduledRelease documents */
  upsert?: InputMaybe<Array<ScheduledReleaseUpsertWithNestedWhereUniqueInput>>;
};

export type ScheduledReleaseUpdateManyInput = {
  description?: InputMaybe<Scalars['String']>;
  errorMessage?: InputMaybe<Scalars['String']>;
  isActive?: InputMaybe<Scalars['Boolean']>;
  releaseAt?: InputMaybe<Scalars['DateTime']>;
  title?: InputMaybe<Scalars['String']>;
};

export type ScheduledReleaseUpdateManyWithNestedWhereInput = {
  /** Update many input */
  data: ScheduledReleaseUpdateManyInput;
  /** Document search */
  where: ScheduledReleaseWhereInput;
};

export type ScheduledReleaseUpdateOneInlineInput = {
  /** Connect existing ScheduledRelease document */
  connect?: InputMaybe<ScheduledReleaseWhereUniqueInput>;
  /** Create and connect one ScheduledRelease document */
  create?: InputMaybe<ScheduledReleaseCreateInput>;
  /** Delete currently connected ScheduledRelease document */
  delete?: InputMaybe<Scalars['Boolean']>;
  /** Disconnect currently connected ScheduledRelease document */
  disconnect?: InputMaybe<Scalars['Boolean']>;
  /** Update single ScheduledRelease document */
  update?: InputMaybe<ScheduledReleaseUpdateWithNestedWhereUniqueInput>;
  /** Upsert single ScheduledRelease document */
  upsert?: InputMaybe<ScheduledReleaseUpsertWithNestedWhereUniqueInput>;
};

export type ScheduledReleaseUpdateWithNestedWhereUniqueInput = {
  /** Document to update */
  data: ScheduledReleaseUpdateInput;
  /** Unique document search */
  where: ScheduledReleaseWhereUniqueInput;
};

export type ScheduledReleaseUpsertInput = {
  /** Create document if it didn't exist */
  create: ScheduledReleaseCreateInput;
  /** Update document if it exists */
  update: ScheduledReleaseUpdateInput;
};

export type ScheduledReleaseUpsertWithNestedWhereUniqueInput = {
  /** Upsert data */
  data: ScheduledReleaseUpsertInput;
  /** Unique document search */
  where: ScheduledReleaseWhereUniqueInput;
};

/** Identifies documents */
export type ScheduledReleaseWhereInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<ScheduledReleaseWhereInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<ScheduledReleaseWhereInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<ScheduledReleaseWhereInput>>;
  /** Contains search across all appropriate fields. */
  _search?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  createdAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  createdAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  createdAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  createdAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  createdAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** Any other value that exists and is not equal to the given value. */
  createdAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  createdAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  createdBy?: InputMaybe<UserWhereInput>;
  description?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  description_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  description_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  description_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Any other value that exists and is not equal to the given value. */
  description_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  description_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  description_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  description_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  description_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  description_starts_with?: InputMaybe<Scalars['String']>;
  errorMessage?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  errorMessage_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  errorMessage_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  errorMessage_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Any other value that exists and is not equal to the given value. */
  errorMessage_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  errorMessage_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  errorMessage_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  errorMessage_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  errorMessage_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  errorMessage_starts_with?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  /** All values containing the given string. */
  id_contains?: InputMaybe<Scalars['ID']>;
  /** All values ending with the given string. */
  id_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are contained in given list. */
  id_in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Any other value that exists and is not equal to the given value. */
  id_not?: InputMaybe<Scalars['ID']>;
  /** All values not containing the given string. */
  id_not_contains?: InputMaybe<Scalars['ID']>;
  /** All values not ending with the given string */
  id_not_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are not contained in given list. */
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** All values not starting with the given string. */
  id_not_starts_with?: InputMaybe<Scalars['ID']>;
  /** All values starting with the given string. */
  id_starts_with?: InputMaybe<Scalars['ID']>;
  isActive?: InputMaybe<Scalars['Boolean']>;
  /** Any other value that exists and is not equal to the given value. */
  isActive_not?: InputMaybe<Scalars['Boolean']>;
  isImplicit?: InputMaybe<Scalars['Boolean']>;
  /** Any other value that exists and is not equal to the given value. */
  isImplicit_not?: InputMaybe<Scalars['Boolean']>;
  operations_every?: InputMaybe<ScheduledOperationWhereInput>;
  operations_none?: InputMaybe<ScheduledOperationWhereInput>;
  operations_some?: InputMaybe<ScheduledOperationWhereInput>;
  publishedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  publishedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  publishedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  publishedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  publishedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  publishedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** Any other value that exists and is not equal to the given value. */
  publishedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  publishedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  publishedBy?: InputMaybe<UserWhereInput>;
  releaseAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  releaseAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  releaseAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  releaseAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  releaseAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  releaseAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** Any other value that exists and is not equal to the given value. */
  releaseAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  releaseAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  status?: InputMaybe<ScheduledReleaseStatus>;
  /** All values that are contained in given list. */
  status_in?: InputMaybe<Array<InputMaybe<ScheduledReleaseStatus>>>;
  /** Any other value that exists and is not equal to the given value. */
  status_not?: InputMaybe<ScheduledReleaseStatus>;
  /** All values that are not contained in given list. */
  status_not_in?: InputMaybe<Array<InputMaybe<ScheduledReleaseStatus>>>;
  title?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  title_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  title_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  title_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Any other value that exists and is not equal to the given value. */
  title_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  title_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  title_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  title_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  title_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  title_starts_with?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  updatedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  updatedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  updatedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  updatedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  updatedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** Any other value that exists and is not equal to the given value. */
  updatedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  updatedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  updatedBy?: InputMaybe<UserWhereInput>;
};

/** References ScheduledRelease record uniquely */
export type ScheduledReleaseWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']>;
};

/** Stage system enumeration */
export enum Stage {
  /** The Draft is the default stage for all your content. */
  Draft = 'DRAFT',
  /** The Published stage is where you can publish your content to. */
  Published = 'PUBLISHED',
}

export enum SystemDateTimeFieldVariation {
  Base = 'BASE',
  Combined = 'COMBINED',
  Localization = 'LOCALIZATION',
}

export type Transaction = Node & {
  __typename?: 'Transaction';
  amountReceived: Scalars['Float'];
  amountSent: Scalars['Float'];
  /** The time the document was created */
  createdAt: Scalars['DateTime'];
  /** User that created this document */
  createdBy?: Maybe<User>;
  date: Scalars['Date'];
  description?: Maybe<Scalars['String']>;
  /** Get the document in other stages */
  documentInStages: Array<Transaction>;
  /** List of Transaction versions */
  history: Array<Version>;
  /** The unique identifier */
  id: Scalars['ID'];
  /** The time the document was published. Null on documents in draft stage. */
  publishedAt?: Maybe<Scalars['DateTime']>;
  /** User that last published this document */
  publishedBy?: Maybe<User>;
  scheduledIn: Array<ScheduledOperation>;
  source?: Maybe<Wallet>;
  /** System stage field */
  stage: Stage;
  target?: Maybe<Wallet>;
  /** The time the document was updated */
  updatedAt: Scalars['DateTime'];
  /** User that last updated this document */
  updatedBy?: Maybe<User>;
};

export type TransactionCreatedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  locales?: InputMaybe<Array<Locale>>;
};

export type TransactionDocumentInStagesArgs = {
  includeCurrent?: Scalars['Boolean'];
  inheritLocale?: Scalars['Boolean'];
  stages?: Array<Stage>;
};

export type TransactionHistoryArgs = {
  limit?: Scalars['Int'];
  skip?: Scalars['Int'];
  stageOverride?: InputMaybe<Stage>;
};

export type TransactionPublishedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  locales?: InputMaybe<Array<Locale>>;
};

export type TransactionScheduledInArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: InputMaybe<Array<Locale>>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ScheduledOperationWhereInput>;
};

export type TransactionSourceArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  locales?: InputMaybe<Array<Locale>>;
};

export type TransactionTargetArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  locales?: InputMaybe<Array<Locale>>;
};

export type TransactionUpdatedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  locales?: InputMaybe<Array<Locale>>;
};

export type TransactionConnectInput = {
  /** Allow to specify document position in list of connected documents, will default to appending at end of list */
  position?: InputMaybe<ConnectPositionInput>;
  /** Document to connect */
  where: TransactionWhereUniqueInput;
};

/** A connection to a list of items. */
export type TransactionConnection = {
  __typename?: 'TransactionConnection';
  aggregate: Aggregate;
  /** A list of edges. */
  edges: Array<TransactionEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

export type TransactionCreateInput = {
  amountReceived: Scalars['Float'];
  amountSent: Scalars['Float'];
  createdAt?: InputMaybe<Scalars['DateTime']>;
  date: Scalars['Date'];
  description?: InputMaybe<Scalars['String']>;
  source?: InputMaybe<WalletCreateOneInlineInput>;
  target?: InputMaybe<WalletCreateOneInlineInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type TransactionCreateManyInlineInput = {
  /** Connect multiple existing Transaction documents */
  connect?: InputMaybe<Array<TransactionWhereUniqueInput>>;
  /** Create and connect multiple existing Transaction documents */
  create?: InputMaybe<Array<TransactionCreateInput>>;
};

export type TransactionCreateOneInlineInput = {
  /** Connect one existing Transaction document */
  connect?: InputMaybe<TransactionWhereUniqueInput>;
  /** Create and connect one Transaction document */
  create?: InputMaybe<TransactionCreateInput>;
};

/** An edge in a connection. */
export type TransactionEdge = {
  __typename?: 'TransactionEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: Transaction;
};

/** Identifies documents */
export type TransactionManyWhereInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<TransactionWhereInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<TransactionWhereInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<TransactionWhereInput>>;
  /** Contains search across all appropriate fields. */
  _search?: InputMaybe<Scalars['String']>;
  amountReceived?: InputMaybe<Scalars['Float']>;
  /** All values greater than the given value. */
  amountReceived_gt?: InputMaybe<Scalars['Float']>;
  /** All values greater than or equal the given value. */
  amountReceived_gte?: InputMaybe<Scalars['Float']>;
  /** All values that are contained in given list. */
  amountReceived_in?: InputMaybe<Array<InputMaybe<Scalars['Float']>>>;
  /** All values less than the given value. */
  amountReceived_lt?: InputMaybe<Scalars['Float']>;
  /** All values less than or equal the given value. */
  amountReceived_lte?: InputMaybe<Scalars['Float']>;
  /** Any other value that exists and is not equal to the given value. */
  amountReceived_not?: InputMaybe<Scalars['Float']>;
  /** All values that are not contained in given list. */
  amountReceived_not_in?: InputMaybe<Array<InputMaybe<Scalars['Float']>>>;
  amountSent?: InputMaybe<Scalars['Float']>;
  /** All values greater than the given value. */
  amountSent_gt?: InputMaybe<Scalars['Float']>;
  /** All values greater than or equal the given value. */
  amountSent_gte?: InputMaybe<Scalars['Float']>;
  /** All values that are contained in given list. */
  amountSent_in?: InputMaybe<Array<InputMaybe<Scalars['Float']>>>;
  /** All values less than the given value. */
  amountSent_lt?: InputMaybe<Scalars['Float']>;
  /** All values less than or equal the given value. */
  amountSent_lte?: InputMaybe<Scalars['Float']>;
  /** Any other value that exists and is not equal to the given value. */
  amountSent_not?: InputMaybe<Scalars['Float']>;
  /** All values that are not contained in given list. */
  amountSent_not_in?: InputMaybe<Array<InputMaybe<Scalars['Float']>>>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  createdAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  createdAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  createdAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  createdAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  createdAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** Any other value that exists and is not equal to the given value. */
  createdAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  createdAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  createdBy?: InputMaybe<UserWhereInput>;
  date?: InputMaybe<Scalars['Date']>;
  /** All values greater than the given value. */
  date_gt?: InputMaybe<Scalars['Date']>;
  /** All values greater than or equal the given value. */
  date_gte?: InputMaybe<Scalars['Date']>;
  /** All values that are contained in given list. */
  date_in?: InputMaybe<Array<InputMaybe<Scalars['Date']>>>;
  /** All values less than the given value. */
  date_lt?: InputMaybe<Scalars['Date']>;
  /** All values less than or equal the given value. */
  date_lte?: InputMaybe<Scalars['Date']>;
  /** Any other value that exists and is not equal to the given value. */
  date_not?: InputMaybe<Scalars['Date']>;
  /** All values that are not contained in given list. */
  date_not_in?: InputMaybe<Array<InputMaybe<Scalars['Date']>>>;
  description?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  description_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  description_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  description_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Any other value that exists and is not equal to the given value. */
  description_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  description_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  description_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  description_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  description_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  description_starts_with?: InputMaybe<Scalars['String']>;
  documentInStages_every?: InputMaybe<TransactionWhereStageInput>;
  documentInStages_none?: InputMaybe<TransactionWhereStageInput>;
  documentInStages_some?: InputMaybe<TransactionWhereStageInput>;
  id?: InputMaybe<Scalars['ID']>;
  /** All values containing the given string. */
  id_contains?: InputMaybe<Scalars['ID']>;
  /** All values ending with the given string. */
  id_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are contained in given list. */
  id_in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Any other value that exists and is not equal to the given value. */
  id_not?: InputMaybe<Scalars['ID']>;
  /** All values not containing the given string. */
  id_not_contains?: InputMaybe<Scalars['ID']>;
  /** All values not ending with the given string */
  id_not_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are not contained in given list. */
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** All values not starting with the given string. */
  id_not_starts_with?: InputMaybe<Scalars['ID']>;
  /** All values starting with the given string. */
  id_starts_with?: InputMaybe<Scalars['ID']>;
  publishedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  publishedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  publishedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  publishedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  publishedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  publishedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** Any other value that exists and is not equal to the given value. */
  publishedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  publishedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  publishedBy?: InputMaybe<UserWhereInput>;
  scheduledIn_every?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_none?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_some?: InputMaybe<ScheduledOperationWhereInput>;
  source?: InputMaybe<WalletWhereInput>;
  target?: InputMaybe<WalletWhereInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  updatedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  updatedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  updatedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  updatedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  updatedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** Any other value that exists and is not equal to the given value. */
  updatedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  updatedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  updatedBy?: InputMaybe<UserWhereInput>;
};

export enum TransactionOrderByInput {
  AmountReceivedAsc = 'amountReceived_ASC',
  AmountReceivedDesc = 'amountReceived_DESC',
  AmountSentAsc = 'amountSent_ASC',
  AmountSentDesc = 'amountSent_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  DateAsc = 'date_ASC',
  DateDesc = 'date_DESC',
  DescriptionAsc = 'description_ASC',
  DescriptionDesc = 'description_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  PublishedAtAsc = 'publishedAt_ASC',
  PublishedAtDesc = 'publishedAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
}

export type TransactionUpdateInput = {
  amountReceived?: InputMaybe<Scalars['Float']>;
  amountSent?: InputMaybe<Scalars['Float']>;
  date?: InputMaybe<Scalars['Date']>;
  description?: InputMaybe<Scalars['String']>;
  source?: InputMaybe<WalletUpdateOneInlineInput>;
  target?: InputMaybe<WalletUpdateOneInlineInput>;
};

export type TransactionUpdateManyInlineInput = {
  /** Connect multiple existing Transaction documents */
  connect?: InputMaybe<Array<TransactionConnectInput>>;
  /** Create and connect multiple Transaction documents */
  create?: InputMaybe<Array<TransactionCreateInput>>;
  /** Delete multiple Transaction documents */
  delete?: InputMaybe<Array<TransactionWhereUniqueInput>>;
  /** Disconnect multiple Transaction documents */
  disconnect?: InputMaybe<Array<TransactionWhereUniqueInput>>;
  /** Override currently-connected documents with multiple existing Transaction documents */
  set?: InputMaybe<Array<TransactionWhereUniqueInput>>;
  /** Update multiple Transaction documents */
  update?: InputMaybe<Array<TransactionUpdateWithNestedWhereUniqueInput>>;
  /** Upsert multiple Transaction documents */
  upsert?: InputMaybe<Array<TransactionUpsertWithNestedWhereUniqueInput>>;
};

export type TransactionUpdateManyInput = {
  amountReceived?: InputMaybe<Scalars['Float']>;
  amountSent?: InputMaybe<Scalars['Float']>;
  date?: InputMaybe<Scalars['Date']>;
  description?: InputMaybe<Scalars['String']>;
};

export type TransactionUpdateManyWithNestedWhereInput = {
  /** Update many input */
  data: TransactionUpdateManyInput;
  /** Document search */
  where: TransactionWhereInput;
};

export type TransactionUpdateOneInlineInput = {
  /** Connect existing Transaction document */
  connect?: InputMaybe<TransactionWhereUniqueInput>;
  /** Create and connect one Transaction document */
  create?: InputMaybe<TransactionCreateInput>;
  /** Delete currently connected Transaction document */
  delete?: InputMaybe<Scalars['Boolean']>;
  /** Disconnect currently connected Transaction document */
  disconnect?: InputMaybe<Scalars['Boolean']>;
  /** Update single Transaction document */
  update?: InputMaybe<TransactionUpdateWithNestedWhereUniqueInput>;
  /** Upsert single Transaction document */
  upsert?: InputMaybe<TransactionUpsertWithNestedWhereUniqueInput>;
};

export type TransactionUpdateWithNestedWhereUniqueInput = {
  /** Document to update */
  data: TransactionUpdateInput;
  /** Unique document search */
  where: TransactionWhereUniqueInput;
};

export type TransactionUpsertInput = {
  /** Create document if it didn't exist */
  create: TransactionCreateInput;
  /** Update document if it exists */
  update: TransactionUpdateInput;
};

export type TransactionUpsertWithNestedWhereUniqueInput = {
  /** Upsert data */
  data: TransactionUpsertInput;
  /** Unique document search */
  where: TransactionWhereUniqueInput;
};

/** This contains a set of filters that can be used to compare values internally */
export type TransactionWhereComparatorInput = {
  /** This field can be used to request to check if the entry is outdated by internal comparison */
  outdated_to?: InputMaybe<Scalars['Boolean']>;
};

/** Identifies documents */
export type TransactionWhereInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<TransactionWhereInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<TransactionWhereInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<TransactionWhereInput>>;
  /** Contains search across all appropriate fields. */
  _search?: InputMaybe<Scalars['String']>;
  amountReceived?: InputMaybe<Scalars['Float']>;
  /** All values greater than the given value. */
  amountReceived_gt?: InputMaybe<Scalars['Float']>;
  /** All values greater than or equal the given value. */
  amountReceived_gte?: InputMaybe<Scalars['Float']>;
  /** All values that are contained in given list. */
  amountReceived_in?: InputMaybe<Array<InputMaybe<Scalars['Float']>>>;
  /** All values less than the given value. */
  amountReceived_lt?: InputMaybe<Scalars['Float']>;
  /** All values less than or equal the given value. */
  amountReceived_lte?: InputMaybe<Scalars['Float']>;
  /** Any other value that exists and is not equal to the given value. */
  amountReceived_not?: InputMaybe<Scalars['Float']>;
  /** All values that are not contained in given list. */
  amountReceived_not_in?: InputMaybe<Array<InputMaybe<Scalars['Float']>>>;
  amountSent?: InputMaybe<Scalars['Float']>;
  /** All values greater than the given value. */
  amountSent_gt?: InputMaybe<Scalars['Float']>;
  /** All values greater than or equal the given value. */
  amountSent_gte?: InputMaybe<Scalars['Float']>;
  /** All values that are contained in given list. */
  amountSent_in?: InputMaybe<Array<InputMaybe<Scalars['Float']>>>;
  /** All values less than the given value. */
  amountSent_lt?: InputMaybe<Scalars['Float']>;
  /** All values less than or equal the given value. */
  amountSent_lte?: InputMaybe<Scalars['Float']>;
  /** Any other value that exists and is not equal to the given value. */
  amountSent_not?: InputMaybe<Scalars['Float']>;
  /** All values that are not contained in given list. */
  amountSent_not_in?: InputMaybe<Array<InputMaybe<Scalars['Float']>>>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  createdAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  createdAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  createdAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  createdAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  createdAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** Any other value that exists and is not equal to the given value. */
  createdAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  createdAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  createdBy?: InputMaybe<UserWhereInput>;
  date?: InputMaybe<Scalars['Date']>;
  /** All values greater than the given value. */
  date_gt?: InputMaybe<Scalars['Date']>;
  /** All values greater than or equal the given value. */
  date_gte?: InputMaybe<Scalars['Date']>;
  /** All values that are contained in given list. */
  date_in?: InputMaybe<Array<InputMaybe<Scalars['Date']>>>;
  /** All values less than the given value. */
  date_lt?: InputMaybe<Scalars['Date']>;
  /** All values less than or equal the given value. */
  date_lte?: InputMaybe<Scalars['Date']>;
  /** Any other value that exists and is not equal to the given value. */
  date_not?: InputMaybe<Scalars['Date']>;
  /** All values that are not contained in given list. */
  date_not_in?: InputMaybe<Array<InputMaybe<Scalars['Date']>>>;
  description?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  description_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  description_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  description_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Any other value that exists and is not equal to the given value. */
  description_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  description_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  description_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  description_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  description_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  description_starts_with?: InputMaybe<Scalars['String']>;
  documentInStages_every?: InputMaybe<TransactionWhereStageInput>;
  documentInStages_none?: InputMaybe<TransactionWhereStageInput>;
  documentInStages_some?: InputMaybe<TransactionWhereStageInput>;
  id?: InputMaybe<Scalars['ID']>;
  /** All values containing the given string. */
  id_contains?: InputMaybe<Scalars['ID']>;
  /** All values ending with the given string. */
  id_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are contained in given list. */
  id_in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Any other value that exists and is not equal to the given value. */
  id_not?: InputMaybe<Scalars['ID']>;
  /** All values not containing the given string. */
  id_not_contains?: InputMaybe<Scalars['ID']>;
  /** All values not ending with the given string */
  id_not_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are not contained in given list. */
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** All values not starting with the given string. */
  id_not_starts_with?: InputMaybe<Scalars['ID']>;
  /** All values starting with the given string. */
  id_starts_with?: InputMaybe<Scalars['ID']>;
  publishedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  publishedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  publishedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  publishedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  publishedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  publishedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** Any other value that exists and is not equal to the given value. */
  publishedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  publishedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  publishedBy?: InputMaybe<UserWhereInput>;
  scheduledIn_every?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_none?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_some?: InputMaybe<ScheduledOperationWhereInput>;
  source?: InputMaybe<WalletWhereInput>;
  target?: InputMaybe<WalletWhereInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  updatedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  updatedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  updatedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  updatedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  updatedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** Any other value that exists and is not equal to the given value. */
  updatedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  updatedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  updatedBy?: InputMaybe<UserWhereInput>;
};

/** The document in stages filter allows specifying a stage entry to cross compare the same document between different stages */
export type TransactionWhereStageInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<TransactionWhereStageInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<TransactionWhereStageInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<TransactionWhereStageInput>>;
  /** This field contains fields which can be set as true or false to specify an internal comparison */
  compareWithParent?: InputMaybe<TransactionWhereComparatorInput>;
  /** Specify the stage to compare with */
  stage?: InputMaybe<Stage>;
};

/** References Transaction record uniquely */
export type TransactionWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']>;
};

export type UnpublishLocaleInput = {
  /** Locales to unpublish */
  locale: Locale;
  /** Stages to unpublish selected locales from */
  stages: Array<Stage>;
};

/** User system model */
export type User = Node & {
  __typename?: 'User';
  /** The time the document was created */
  createdAt: Scalars['DateTime'];
  /** Get the document in other stages */
  documentInStages: Array<User>;
  /** The unique identifier */
  id: Scalars['ID'];
  /** Flag to determine if user is active or not */
  isActive: Scalars['Boolean'];
  /** User Kind. Can be either MEMBER, PAT or PUBLIC */
  kind: UserKind;
  /** The username */
  name: Scalars['String'];
  /** Profile Picture url */
  picture?: Maybe<Scalars['String']>;
  /** The time the document was published. Null on documents in draft stage. */
  publishedAt?: Maybe<Scalars['DateTime']>;
  /** System stage field */
  stage: Stage;
  /** The time the document was updated */
  updatedAt: Scalars['DateTime'];
};

/** User system model */
export type UserDocumentInStagesArgs = {
  includeCurrent?: Scalars['Boolean'];
  inheritLocale?: Scalars['Boolean'];
  stages?: Array<Stage>;
};

export type UserConnectInput = {
  /** Allow to specify document position in list of connected documents, will default to appending at end of list */
  position?: InputMaybe<ConnectPositionInput>;
  /** Document to connect */
  where: UserWhereUniqueInput;
};

/** A connection to a list of items. */
export type UserConnection = {
  __typename?: 'UserConnection';
  aggregate: Aggregate;
  /** A list of edges. */
  edges: Array<UserEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

export type UserCreateManyInlineInput = {
  /** Connect multiple existing User documents */
  connect?: InputMaybe<Array<UserWhereUniqueInput>>;
};

export type UserCreateOneInlineInput = {
  /** Connect one existing User document */
  connect?: InputMaybe<UserWhereUniqueInput>;
};

/** An edge in a connection. */
export type UserEdge = {
  __typename?: 'UserEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: User;
};

/** System User Kind */
export enum UserKind {
  Member = 'MEMBER',
  Pat = 'PAT',
  Public = 'PUBLIC',
  Webhook = 'WEBHOOK',
}

/** Identifies documents */
export type UserManyWhereInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<UserWhereInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<UserWhereInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<UserWhereInput>>;
  /** Contains search across all appropriate fields. */
  _search?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  createdAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  createdAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  createdAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  createdAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  createdAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** Any other value that exists and is not equal to the given value. */
  createdAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  createdAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  documentInStages_every?: InputMaybe<UserWhereStageInput>;
  documentInStages_none?: InputMaybe<UserWhereStageInput>;
  documentInStages_some?: InputMaybe<UserWhereStageInput>;
  id?: InputMaybe<Scalars['ID']>;
  /** All values containing the given string. */
  id_contains?: InputMaybe<Scalars['ID']>;
  /** All values ending with the given string. */
  id_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are contained in given list. */
  id_in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Any other value that exists and is not equal to the given value. */
  id_not?: InputMaybe<Scalars['ID']>;
  /** All values not containing the given string. */
  id_not_contains?: InputMaybe<Scalars['ID']>;
  /** All values not ending with the given string */
  id_not_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are not contained in given list. */
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** All values not starting with the given string. */
  id_not_starts_with?: InputMaybe<Scalars['ID']>;
  /** All values starting with the given string. */
  id_starts_with?: InputMaybe<Scalars['ID']>;
  isActive?: InputMaybe<Scalars['Boolean']>;
  /** Any other value that exists and is not equal to the given value. */
  isActive_not?: InputMaybe<Scalars['Boolean']>;
  kind?: InputMaybe<UserKind>;
  /** All values that are contained in given list. */
  kind_in?: InputMaybe<Array<InputMaybe<UserKind>>>;
  /** Any other value that exists and is not equal to the given value. */
  kind_not?: InputMaybe<UserKind>;
  /** All values that are not contained in given list. */
  kind_not_in?: InputMaybe<Array<InputMaybe<UserKind>>>;
  name?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  name_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  name_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  name_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Any other value that exists and is not equal to the given value. */
  name_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  name_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  name_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  name_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  name_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  name_starts_with?: InputMaybe<Scalars['String']>;
  picture?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  picture_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  picture_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  picture_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Any other value that exists and is not equal to the given value. */
  picture_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  picture_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  picture_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  picture_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  picture_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  picture_starts_with?: InputMaybe<Scalars['String']>;
  publishedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  publishedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  publishedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  publishedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  publishedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  publishedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** Any other value that exists and is not equal to the given value. */
  publishedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  publishedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  updatedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  updatedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  updatedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  updatedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  updatedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** Any other value that exists and is not equal to the given value. */
  updatedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  updatedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
};

export enum UserOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  IsActiveAsc = 'isActive_ASC',
  IsActiveDesc = 'isActive_DESC',
  KindAsc = 'kind_ASC',
  KindDesc = 'kind_DESC',
  NameAsc = 'name_ASC',
  NameDesc = 'name_DESC',
  PictureAsc = 'picture_ASC',
  PictureDesc = 'picture_DESC',
  PublishedAtAsc = 'publishedAt_ASC',
  PublishedAtDesc = 'publishedAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
}

export type UserUpdateManyInlineInput = {
  /** Connect multiple existing User documents */
  connect?: InputMaybe<Array<UserConnectInput>>;
  /** Disconnect multiple User documents */
  disconnect?: InputMaybe<Array<UserWhereUniqueInput>>;
  /** Override currently-connected documents with multiple existing User documents */
  set?: InputMaybe<Array<UserWhereUniqueInput>>;
};

export type UserUpdateOneInlineInput = {
  /** Connect existing User document */
  connect?: InputMaybe<UserWhereUniqueInput>;
  /** Disconnect currently connected User document */
  disconnect?: InputMaybe<Scalars['Boolean']>;
};

/** This contains a set of filters that can be used to compare values internally */
export type UserWhereComparatorInput = {
  /** This field can be used to request to check if the entry is outdated by internal comparison */
  outdated_to?: InputMaybe<Scalars['Boolean']>;
};

/** Identifies documents */
export type UserWhereInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<UserWhereInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<UserWhereInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<UserWhereInput>>;
  /** Contains search across all appropriate fields. */
  _search?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  createdAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  createdAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  createdAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  createdAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  createdAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** Any other value that exists and is not equal to the given value. */
  createdAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  createdAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  documentInStages_every?: InputMaybe<UserWhereStageInput>;
  documentInStages_none?: InputMaybe<UserWhereStageInput>;
  documentInStages_some?: InputMaybe<UserWhereStageInput>;
  id?: InputMaybe<Scalars['ID']>;
  /** All values containing the given string. */
  id_contains?: InputMaybe<Scalars['ID']>;
  /** All values ending with the given string. */
  id_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are contained in given list. */
  id_in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Any other value that exists and is not equal to the given value. */
  id_not?: InputMaybe<Scalars['ID']>;
  /** All values not containing the given string. */
  id_not_contains?: InputMaybe<Scalars['ID']>;
  /** All values not ending with the given string */
  id_not_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are not contained in given list. */
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** All values not starting with the given string. */
  id_not_starts_with?: InputMaybe<Scalars['ID']>;
  /** All values starting with the given string. */
  id_starts_with?: InputMaybe<Scalars['ID']>;
  isActive?: InputMaybe<Scalars['Boolean']>;
  /** Any other value that exists and is not equal to the given value. */
  isActive_not?: InputMaybe<Scalars['Boolean']>;
  kind?: InputMaybe<UserKind>;
  /** All values that are contained in given list. */
  kind_in?: InputMaybe<Array<InputMaybe<UserKind>>>;
  /** Any other value that exists and is not equal to the given value. */
  kind_not?: InputMaybe<UserKind>;
  /** All values that are not contained in given list. */
  kind_not_in?: InputMaybe<Array<InputMaybe<UserKind>>>;
  name?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  name_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  name_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  name_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Any other value that exists and is not equal to the given value. */
  name_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  name_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  name_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  name_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  name_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  name_starts_with?: InputMaybe<Scalars['String']>;
  picture?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  picture_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  picture_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  picture_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Any other value that exists and is not equal to the given value. */
  picture_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  picture_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  picture_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  picture_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  picture_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  picture_starts_with?: InputMaybe<Scalars['String']>;
  publishedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  publishedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  publishedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  publishedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  publishedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  publishedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** Any other value that exists and is not equal to the given value. */
  publishedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  publishedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  updatedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  updatedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  updatedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  updatedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  updatedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** Any other value that exists and is not equal to the given value. */
  updatedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  updatedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
};

/** The document in stages filter allows specifying a stage entry to cross compare the same document between different stages */
export type UserWhereStageInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<UserWhereStageInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<UserWhereStageInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<UserWhereStageInput>>;
  /** This field contains fields which can be set as true or false to specify an internal comparison */
  compareWithParent?: InputMaybe<UserWhereComparatorInput>;
  /** Specify the stage to compare with */
  stage?: InputMaybe<Stage>;
};

/** References User record uniquely */
export type UserWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']>;
};

export type Version = {
  __typename?: 'Version';
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  revision: Scalars['Int'];
  stage: Stage;
};

export type VersionWhereInput = {
  id: Scalars['ID'];
  revision: Scalars['Int'];
  stage: Stage;
};

export type Wallet = Node & {
  __typename?: 'Wallet';
  amount: Scalars['Float'];
  broker?: Maybe<Scalars['String']>;
  /** The time the document was created */
  createdAt: Scalars['DateTime'];
  /** User that created this document */
  createdBy?: Maybe<User>;
  currency?: Maybe<Scalars['String']>;
  deleted?: Maybe<Scalars['Boolean']>;
  /** Get the document in other stages */
  documentInStages: Array<Wallet>;
  /** List of Wallet versions */
  history: Array<Version>;
  holder: Scalars['String'];
  /** The unique identifier */
  id: Scalars['ID'];
  /** The time the document was published. Null on documents in draft stage. */
  publishedAt?: Maybe<Scalars['DateTime']>;
  /** User that last published this document */
  publishedBy?: Maybe<User>;
  scheduledIn: Array<ScheduledOperation>;
  source_transaction: Array<Transaction>;
  /** System stage field */
  stage: Stage;
  target_transaction: Array<Transaction>;
  type: Scalars['Int'];
  /** The time the document was updated */
  updatedAt: Scalars['DateTime'];
  /** User that last updated this document */
  updatedBy?: Maybe<User>;
};

export type WalletCreatedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  locales?: InputMaybe<Array<Locale>>;
};

export type WalletDocumentInStagesArgs = {
  includeCurrent?: Scalars['Boolean'];
  inheritLocale?: Scalars['Boolean'];
  stages?: Array<Stage>;
};

export type WalletHistoryArgs = {
  limit?: Scalars['Int'];
  skip?: Scalars['Int'];
  stageOverride?: InputMaybe<Stage>;
};

export type WalletPublishedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  locales?: InputMaybe<Array<Locale>>;
};

export type WalletScheduledInArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: InputMaybe<Array<Locale>>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ScheduledOperationWhereInput>;
};

export type WalletSource_TransactionArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: InputMaybe<Array<Locale>>;
  orderBy?: InputMaybe<TransactionOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<TransactionWhereInput>;
};

export type WalletTarget_TransactionArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: InputMaybe<Array<Locale>>;
  orderBy?: InputMaybe<TransactionOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<TransactionWhereInput>;
};

export type WalletUpdatedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  locales?: InputMaybe<Array<Locale>>;
};

export type WalletConnectInput = {
  /** Allow to specify document position in list of connected documents, will default to appending at end of list */
  position?: InputMaybe<ConnectPositionInput>;
  /** Document to connect */
  where: WalletWhereUniqueInput;
};

/** A connection to a list of items. */
export type WalletConnection = {
  __typename?: 'WalletConnection';
  aggregate: Aggregate;
  /** A list of edges. */
  edges: Array<WalletEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

export type WalletCreateInput = {
  amount: Scalars['Float'];
  broker?: InputMaybe<Scalars['String']>;
  clffbd3v41moy01t61wibh5dc?: InputMaybe<ExpenseCreateManyInlineInput>;
  clffltrwe1stn01tefg9fa4uz?: InputMaybe<RevenueCreateManyInlineInput>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  currency?: InputMaybe<Scalars['String']>;
  deleted?: InputMaybe<Scalars['Boolean']>;
  holder: Scalars['String'];
  source_transaction?: InputMaybe<TransactionCreateManyInlineInput>;
  target_transaction?: InputMaybe<TransactionCreateManyInlineInput>;
  type: Scalars['Int'];
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type WalletCreateManyInlineInput = {
  /** Connect multiple existing Wallet documents */
  connect?: InputMaybe<Array<WalletWhereUniqueInput>>;
  /** Create and connect multiple existing Wallet documents */
  create?: InputMaybe<Array<WalletCreateInput>>;
};

export type WalletCreateOneInlineInput = {
  /** Connect one existing Wallet document */
  connect?: InputMaybe<WalletWhereUniqueInput>;
  /** Create and connect one Wallet document */
  create?: InputMaybe<WalletCreateInput>;
};

/** An edge in a connection. */
export type WalletEdge = {
  __typename?: 'WalletEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: Wallet;
};

/** Identifies documents */
export type WalletManyWhereInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<WalletWhereInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<WalletWhereInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<WalletWhereInput>>;
  /** Contains search across all appropriate fields. */
  _search?: InputMaybe<Scalars['String']>;
  amount?: InputMaybe<Scalars['Float']>;
  /** All values greater than the given value. */
  amount_gt?: InputMaybe<Scalars['Float']>;
  /** All values greater than or equal the given value. */
  amount_gte?: InputMaybe<Scalars['Float']>;
  /** All values that are contained in given list. */
  amount_in?: InputMaybe<Array<InputMaybe<Scalars['Float']>>>;
  /** All values less than the given value. */
  amount_lt?: InputMaybe<Scalars['Float']>;
  /** All values less than or equal the given value. */
  amount_lte?: InputMaybe<Scalars['Float']>;
  /** Any other value that exists and is not equal to the given value. */
  amount_not?: InputMaybe<Scalars['Float']>;
  /** All values that are not contained in given list. */
  amount_not_in?: InputMaybe<Array<InputMaybe<Scalars['Float']>>>;
  broker?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  broker_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  broker_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  broker_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Any other value that exists and is not equal to the given value. */
  broker_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  broker_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  broker_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  broker_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  broker_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  broker_starts_with?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  createdAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  createdAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  createdAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  createdAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  createdAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** Any other value that exists and is not equal to the given value. */
  createdAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  createdAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  createdBy?: InputMaybe<UserWhereInput>;
  currency?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  currency_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  currency_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  currency_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Any other value that exists and is not equal to the given value. */
  currency_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  currency_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  currency_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  currency_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  currency_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  currency_starts_with?: InputMaybe<Scalars['String']>;
  deleted?: InputMaybe<Scalars['Boolean']>;
  /** Any other value that exists and is not equal to the given value. */
  deleted_not?: InputMaybe<Scalars['Boolean']>;
  documentInStages_every?: InputMaybe<WalletWhereStageInput>;
  documentInStages_none?: InputMaybe<WalletWhereStageInput>;
  documentInStages_some?: InputMaybe<WalletWhereStageInput>;
  holder?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  holder_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  holder_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  holder_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Any other value that exists and is not equal to the given value. */
  holder_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  holder_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  holder_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  holder_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  holder_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  holder_starts_with?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  /** All values containing the given string. */
  id_contains?: InputMaybe<Scalars['ID']>;
  /** All values ending with the given string. */
  id_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are contained in given list. */
  id_in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Any other value that exists and is not equal to the given value. */
  id_not?: InputMaybe<Scalars['ID']>;
  /** All values not containing the given string. */
  id_not_contains?: InputMaybe<Scalars['ID']>;
  /** All values not ending with the given string */
  id_not_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are not contained in given list. */
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** All values not starting with the given string. */
  id_not_starts_with?: InputMaybe<Scalars['ID']>;
  /** All values starting with the given string. */
  id_starts_with?: InputMaybe<Scalars['ID']>;
  publishedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  publishedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  publishedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  publishedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  publishedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  publishedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** Any other value that exists and is not equal to the given value. */
  publishedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  publishedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  publishedBy?: InputMaybe<UserWhereInput>;
  scheduledIn_every?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_none?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_some?: InputMaybe<ScheduledOperationWhereInput>;
  source_transaction_every?: InputMaybe<TransactionWhereInput>;
  source_transaction_none?: InputMaybe<TransactionWhereInput>;
  source_transaction_some?: InputMaybe<TransactionWhereInput>;
  target_transaction_every?: InputMaybe<TransactionWhereInput>;
  target_transaction_none?: InputMaybe<TransactionWhereInput>;
  target_transaction_some?: InputMaybe<TransactionWhereInput>;
  type?: InputMaybe<Scalars['Int']>;
  /** All values greater than the given value. */
  type_gt?: InputMaybe<Scalars['Int']>;
  /** All values greater than or equal the given value. */
  type_gte?: InputMaybe<Scalars['Int']>;
  /** All values that are contained in given list. */
  type_in?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  /** All values less than the given value. */
  type_lt?: InputMaybe<Scalars['Int']>;
  /** All values less than or equal the given value. */
  type_lte?: InputMaybe<Scalars['Int']>;
  /** Any other value that exists and is not equal to the given value. */
  type_not?: InputMaybe<Scalars['Int']>;
  /** All values that are not contained in given list. */
  type_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  updatedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  updatedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  updatedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  updatedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  updatedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** Any other value that exists and is not equal to the given value. */
  updatedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  updatedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  updatedBy?: InputMaybe<UserWhereInput>;
};

export enum WalletOrderByInput {
  AmountAsc = 'amount_ASC',
  AmountDesc = 'amount_DESC',
  BrokerAsc = 'broker_ASC',
  BrokerDesc = 'broker_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  CurrencyAsc = 'currency_ASC',
  CurrencyDesc = 'currency_DESC',
  DeletedAsc = 'deleted_ASC',
  DeletedDesc = 'deleted_DESC',
  HolderAsc = 'holder_ASC',
  HolderDesc = 'holder_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  PublishedAtAsc = 'publishedAt_ASC',
  PublishedAtDesc = 'publishedAt_DESC',
  TypeAsc = 'type_ASC',
  TypeDesc = 'type_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
}

export type WalletUpdateInput = {
  amount?: InputMaybe<Scalars['Float']>;
  broker?: InputMaybe<Scalars['String']>;
  clffbd3v41moy01t61wibh5dc?: InputMaybe<ExpenseUpdateManyInlineInput>;
  clffltrwe1stn01tefg9fa4uz?: InputMaybe<RevenueUpdateManyInlineInput>;
  currency?: InputMaybe<Scalars['String']>;
  deleted?: InputMaybe<Scalars['Boolean']>;
  holder?: InputMaybe<Scalars['String']>;
  source_transaction?: InputMaybe<TransactionUpdateManyInlineInput>;
  target_transaction?: InputMaybe<TransactionUpdateManyInlineInput>;
  type?: InputMaybe<Scalars['Int']>;
};

export type WalletUpdateManyInlineInput = {
  /** Connect multiple existing Wallet documents */
  connect?: InputMaybe<Array<WalletConnectInput>>;
  /** Create and connect multiple Wallet documents */
  create?: InputMaybe<Array<WalletCreateInput>>;
  /** Delete multiple Wallet documents */
  delete?: InputMaybe<Array<WalletWhereUniqueInput>>;
  /** Disconnect multiple Wallet documents */
  disconnect?: InputMaybe<Array<WalletWhereUniqueInput>>;
  /** Override currently-connected documents with multiple existing Wallet documents */
  set?: InputMaybe<Array<WalletWhereUniqueInput>>;
  /** Update multiple Wallet documents */
  update?: InputMaybe<Array<WalletUpdateWithNestedWhereUniqueInput>>;
  /** Upsert multiple Wallet documents */
  upsert?: InputMaybe<Array<WalletUpsertWithNestedWhereUniqueInput>>;
};

export type WalletUpdateManyInput = {
  amount?: InputMaybe<Scalars['Float']>;
  broker?: InputMaybe<Scalars['String']>;
  currency?: InputMaybe<Scalars['String']>;
  deleted?: InputMaybe<Scalars['Boolean']>;
  holder?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['Int']>;
};

export type WalletUpdateManyWithNestedWhereInput = {
  /** Update many input */
  data: WalletUpdateManyInput;
  /** Document search */
  where: WalletWhereInput;
};

export type WalletUpdateOneInlineInput = {
  /** Connect existing Wallet document */
  connect?: InputMaybe<WalletWhereUniqueInput>;
  /** Create and connect one Wallet document */
  create?: InputMaybe<WalletCreateInput>;
  /** Delete currently connected Wallet document */
  delete?: InputMaybe<Scalars['Boolean']>;
  /** Disconnect currently connected Wallet document */
  disconnect?: InputMaybe<Scalars['Boolean']>;
  /** Update single Wallet document */
  update?: InputMaybe<WalletUpdateWithNestedWhereUniqueInput>;
  /** Upsert single Wallet document */
  upsert?: InputMaybe<WalletUpsertWithNestedWhereUniqueInput>;
};

export type WalletUpdateWithNestedWhereUniqueInput = {
  /** Document to update */
  data: WalletUpdateInput;
  /** Unique document search */
  where: WalletWhereUniqueInput;
};

export type WalletUpsertInput = {
  /** Create document if it didn't exist */
  create: WalletCreateInput;
  /** Update document if it exists */
  update: WalletUpdateInput;
};

export type WalletUpsertWithNestedWhereUniqueInput = {
  /** Upsert data */
  data: WalletUpsertInput;
  /** Unique document search */
  where: WalletWhereUniqueInput;
};

/** This contains a set of filters that can be used to compare values internally */
export type WalletWhereComparatorInput = {
  /** This field can be used to request to check if the entry is outdated by internal comparison */
  outdated_to?: InputMaybe<Scalars['Boolean']>;
};

/** Identifies documents */
export type WalletWhereInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<WalletWhereInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<WalletWhereInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<WalletWhereInput>>;
  /** Contains search across all appropriate fields. */
  _search?: InputMaybe<Scalars['String']>;
  amount?: InputMaybe<Scalars['Float']>;
  /** All values greater than the given value. */
  amount_gt?: InputMaybe<Scalars['Float']>;
  /** All values greater than or equal the given value. */
  amount_gte?: InputMaybe<Scalars['Float']>;
  /** All values that are contained in given list. */
  amount_in?: InputMaybe<Array<InputMaybe<Scalars['Float']>>>;
  /** All values less than the given value. */
  amount_lt?: InputMaybe<Scalars['Float']>;
  /** All values less than or equal the given value. */
  amount_lte?: InputMaybe<Scalars['Float']>;
  /** Any other value that exists and is not equal to the given value. */
  amount_not?: InputMaybe<Scalars['Float']>;
  /** All values that are not contained in given list. */
  amount_not_in?: InputMaybe<Array<InputMaybe<Scalars['Float']>>>;
  broker?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  broker_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  broker_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  broker_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Any other value that exists and is not equal to the given value. */
  broker_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  broker_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  broker_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  broker_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  broker_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  broker_starts_with?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  createdAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  createdAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  createdAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  createdAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  createdAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** Any other value that exists and is not equal to the given value. */
  createdAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  createdAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  createdBy?: InputMaybe<UserWhereInput>;
  currency?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  currency_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  currency_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  currency_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Any other value that exists and is not equal to the given value. */
  currency_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  currency_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  currency_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  currency_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  currency_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  currency_starts_with?: InputMaybe<Scalars['String']>;
  deleted?: InputMaybe<Scalars['Boolean']>;
  /** Any other value that exists and is not equal to the given value. */
  deleted_not?: InputMaybe<Scalars['Boolean']>;
  documentInStages_every?: InputMaybe<WalletWhereStageInput>;
  documentInStages_none?: InputMaybe<WalletWhereStageInput>;
  documentInStages_some?: InputMaybe<WalletWhereStageInput>;
  holder?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  holder_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  holder_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  holder_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Any other value that exists and is not equal to the given value. */
  holder_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  holder_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  holder_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  holder_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  holder_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  holder_starts_with?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  /** All values containing the given string. */
  id_contains?: InputMaybe<Scalars['ID']>;
  /** All values ending with the given string. */
  id_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are contained in given list. */
  id_in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Any other value that exists and is not equal to the given value. */
  id_not?: InputMaybe<Scalars['ID']>;
  /** All values not containing the given string. */
  id_not_contains?: InputMaybe<Scalars['ID']>;
  /** All values not ending with the given string */
  id_not_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are not contained in given list. */
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** All values not starting with the given string. */
  id_not_starts_with?: InputMaybe<Scalars['ID']>;
  /** All values starting with the given string. */
  id_starts_with?: InputMaybe<Scalars['ID']>;
  publishedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  publishedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  publishedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  publishedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  publishedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  publishedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** Any other value that exists and is not equal to the given value. */
  publishedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  publishedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  publishedBy?: InputMaybe<UserWhereInput>;
  scheduledIn_every?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_none?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_some?: InputMaybe<ScheduledOperationWhereInput>;
  source_transaction_every?: InputMaybe<TransactionWhereInput>;
  source_transaction_none?: InputMaybe<TransactionWhereInput>;
  source_transaction_some?: InputMaybe<TransactionWhereInput>;
  target_transaction_every?: InputMaybe<TransactionWhereInput>;
  target_transaction_none?: InputMaybe<TransactionWhereInput>;
  target_transaction_some?: InputMaybe<TransactionWhereInput>;
  type?: InputMaybe<Scalars['Int']>;
  /** All values greater than the given value. */
  type_gt?: InputMaybe<Scalars['Int']>;
  /** All values greater than or equal the given value. */
  type_gte?: InputMaybe<Scalars['Int']>;
  /** All values that are contained in given list. */
  type_in?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  /** All values less than the given value. */
  type_lt?: InputMaybe<Scalars['Int']>;
  /** All values less than or equal the given value. */
  type_lte?: InputMaybe<Scalars['Int']>;
  /** Any other value that exists and is not equal to the given value. */
  type_not?: InputMaybe<Scalars['Int']>;
  /** All values that are not contained in given list. */
  type_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  updatedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  updatedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  updatedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  updatedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  updatedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** Any other value that exists and is not equal to the given value. */
  updatedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  updatedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  updatedBy?: InputMaybe<UserWhereInput>;
};

/** The document in stages filter allows specifying a stage entry to cross compare the same document between different stages */
export type WalletWhereStageInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<WalletWhereStageInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<WalletWhereStageInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<WalletWhereStageInput>>;
  /** This field contains fields which can be set as true or false to specify an internal comparison */
  compareWithParent?: InputMaybe<WalletWhereComparatorInput>;
  /** Specify the stage to compare with */
  stage?: InputMaybe<Stage>;
};

/** References Wallet record uniquely */
export type WalletWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']>;
};

export type Wish = Node & {
  __typename?: 'Wish';
  amount?: Maybe<Scalars['Float']>;
  category?: Maybe<Category>;
  /** The time the document was created */
  createdAt: Scalars['DateTime'];
  /** User that created this document */
  createdBy?: Maybe<User>;
  currency?: Maybe<Scalars['String']>;
  deleted?: Maybe<Scalars['Boolean']>;
  description?: Maybe<Scalars['String']>;
  /** Get the document in other stages */
  documentInStages: Array<Wish>;
  /** List of Wish versions */
  history: Array<Version>;
  /** The unique identifier */
  id: Scalars['ID'];
  itemStatus?: Maybe<Scalars['Int']>;
  /** The time the document was published. Null on documents in draft stage. */
  publishedAt?: Maybe<Scalars['DateTime']>;
  /** User that last published this document */
  publishedBy?: Maybe<User>;
  scheduledIn: Array<ScheduledOperation>;
  /** System stage field */
  stage: Stage;
  /** The time the document was updated */
  updatedAt: Scalars['DateTime'];
  /** User that last updated this document */
  updatedBy?: Maybe<User>;
};

export type WishCategoryArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  locales?: InputMaybe<Array<Locale>>;
};

export type WishCreatedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  locales?: InputMaybe<Array<Locale>>;
};

export type WishDocumentInStagesArgs = {
  includeCurrent?: Scalars['Boolean'];
  inheritLocale?: Scalars['Boolean'];
  stages?: Array<Stage>;
};

export type WishHistoryArgs = {
  limit?: Scalars['Int'];
  skip?: Scalars['Int'];
  stageOverride?: InputMaybe<Stage>;
};

export type WishPublishedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  locales?: InputMaybe<Array<Locale>>;
};

export type WishScheduledInArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: InputMaybe<Array<Locale>>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ScheduledOperationWhereInput>;
};

export type WishUpdatedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  locales?: InputMaybe<Array<Locale>>;
};

export type WishConnectInput = {
  /** Allow to specify document position in list of connected documents, will default to appending at end of list */
  position?: InputMaybe<ConnectPositionInput>;
  /** Document to connect */
  where: WishWhereUniqueInput;
};

/** A connection to a list of items. */
export type WishConnection = {
  __typename?: 'WishConnection';
  aggregate: Aggregate;
  /** A list of edges. */
  edges: Array<WishEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

export type WishCreateInput = {
  amount?: InputMaybe<Scalars['Float']>;
  category?: InputMaybe<CategoryCreateOneInlineInput>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  currency?: InputMaybe<Scalars['String']>;
  deleted?: InputMaybe<Scalars['Boolean']>;
  description?: InputMaybe<Scalars['String']>;
  itemStatus?: InputMaybe<Scalars['Int']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type WishCreateManyInlineInput = {
  /** Connect multiple existing Wish documents */
  connect?: InputMaybe<Array<WishWhereUniqueInput>>;
  /** Create and connect multiple existing Wish documents */
  create?: InputMaybe<Array<WishCreateInput>>;
};

export type WishCreateOneInlineInput = {
  /** Connect one existing Wish document */
  connect?: InputMaybe<WishWhereUniqueInput>;
  /** Create and connect one Wish document */
  create?: InputMaybe<WishCreateInput>;
};

/** An edge in a connection. */
export type WishEdge = {
  __typename?: 'WishEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: Wish;
};

/** Identifies documents */
export type WishManyWhereInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<WishWhereInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<WishWhereInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<WishWhereInput>>;
  /** Contains search across all appropriate fields. */
  _search?: InputMaybe<Scalars['String']>;
  amount?: InputMaybe<Scalars['Float']>;
  /** All values greater than the given value. */
  amount_gt?: InputMaybe<Scalars['Float']>;
  /** All values greater than or equal the given value. */
  amount_gte?: InputMaybe<Scalars['Float']>;
  /** All values that are contained in given list. */
  amount_in?: InputMaybe<Array<InputMaybe<Scalars['Float']>>>;
  /** All values less than the given value. */
  amount_lt?: InputMaybe<Scalars['Float']>;
  /** All values less than or equal the given value. */
  amount_lte?: InputMaybe<Scalars['Float']>;
  /** Any other value that exists and is not equal to the given value. */
  amount_not?: InputMaybe<Scalars['Float']>;
  /** All values that are not contained in given list. */
  amount_not_in?: InputMaybe<Array<InputMaybe<Scalars['Float']>>>;
  category?: InputMaybe<CategoryWhereInput>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  createdAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  createdAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  createdAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  createdAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  createdAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** Any other value that exists and is not equal to the given value. */
  createdAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  createdAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  createdBy?: InputMaybe<UserWhereInput>;
  currency?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  currency_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  currency_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  currency_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Any other value that exists and is not equal to the given value. */
  currency_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  currency_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  currency_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  currency_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  currency_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  currency_starts_with?: InputMaybe<Scalars['String']>;
  deleted?: InputMaybe<Scalars['Boolean']>;
  /** Any other value that exists and is not equal to the given value. */
  deleted_not?: InputMaybe<Scalars['Boolean']>;
  description?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  description_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  description_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  description_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Any other value that exists and is not equal to the given value. */
  description_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  description_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  description_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  description_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  description_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  description_starts_with?: InputMaybe<Scalars['String']>;
  documentInStages_every?: InputMaybe<WishWhereStageInput>;
  documentInStages_none?: InputMaybe<WishWhereStageInput>;
  documentInStages_some?: InputMaybe<WishWhereStageInput>;
  id?: InputMaybe<Scalars['ID']>;
  /** All values containing the given string. */
  id_contains?: InputMaybe<Scalars['ID']>;
  /** All values ending with the given string. */
  id_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are contained in given list. */
  id_in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Any other value that exists and is not equal to the given value. */
  id_not?: InputMaybe<Scalars['ID']>;
  /** All values not containing the given string. */
  id_not_contains?: InputMaybe<Scalars['ID']>;
  /** All values not ending with the given string */
  id_not_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are not contained in given list. */
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** All values not starting with the given string. */
  id_not_starts_with?: InputMaybe<Scalars['ID']>;
  /** All values starting with the given string. */
  id_starts_with?: InputMaybe<Scalars['ID']>;
  itemStatus?: InputMaybe<Scalars['Int']>;
  /** All values greater than the given value. */
  itemStatus_gt?: InputMaybe<Scalars['Int']>;
  /** All values greater than or equal the given value. */
  itemStatus_gte?: InputMaybe<Scalars['Int']>;
  /** All values that are contained in given list. */
  itemStatus_in?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  /** All values less than the given value. */
  itemStatus_lt?: InputMaybe<Scalars['Int']>;
  /** All values less than or equal the given value. */
  itemStatus_lte?: InputMaybe<Scalars['Int']>;
  /** Any other value that exists and is not equal to the given value. */
  itemStatus_not?: InputMaybe<Scalars['Int']>;
  /** All values that are not contained in given list. */
  itemStatus_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  publishedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  publishedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  publishedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  publishedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  publishedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  publishedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** Any other value that exists and is not equal to the given value. */
  publishedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  publishedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  publishedBy?: InputMaybe<UserWhereInput>;
  scheduledIn_every?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_none?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_some?: InputMaybe<ScheduledOperationWhereInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  updatedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  updatedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  updatedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  updatedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  updatedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** Any other value that exists and is not equal to the given value. */
  updatedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  updatedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  updatedBy?: InputMaybe<UserWhereInput>;
};

export enum WishOrderByInput {
  AmountAsc = 'amount_ASC',
  AmountDesc = 'amount_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  CurrencyAsc = 'currency_ASC',
  CurrencyDesc = 'currency_DESC',
  DeletedAsc = 'deleted_ASC',
  DeletedDesc = 'deleted_DESC',
  DescriptionAsc = 'description_ASC',
  DescriptionDesc = 'description_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  ItemStatusAsc = 'itemStatus_ASC',
  ItemStatusDesc = 'itemStatus_DESC',
  PublishedAtAsc = 'publishedAt_ASC',
  PublishedAtDesc = 'publishedAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
}

export type WishUpdateInput = {
  amount?: InputMaybe<Scalars['Float']>;
  category?: InputMaybe<CategoryUpdateOneInlineInput>;
  currency?: InputMaybe<Scalars['String']>;
  deleted?: InputMaybe<Scalars['Boolean']>;
  description?: InputMaybe<Scalars['String']>;
  itemStatus?: InputMaybe<Scalars['Int']>;
};

export type WishUpdateManyInlineInput = {
  /** Connect multiple existing Wish documents */
  connect?: InputMaybe<Array<WishConnectInput>>;
  /** Create and connect multiple Wish documents */
  create?: InputMaybe<Array<WishCreateInput>>;
  /** Delete multiple Wish documents */
  delete?: InputMaybe<Array<WishWhereUniqueInput>>;
  /** Disconnect multiple Wish documents */
  disconnect?: InputMaybe<Array<WishWhereUniqueInput>>;
  /** Override currently-connected documents with multiple existing Wish documents */
  set?: InputMaybe<Array<WishWhereUniqueInput>>;
  /** Update multiple Wish documents */
  update?: InputMaybe<Array<WishUpdateWithNestedWhereUniqueInput>>;
  /** Upsert multiple Wish documents */
  upsert?: InputMaybe<Array<WishUpsertWithNestedWhereUniqueInput>>;
};

export type WishUpdateManyInput = {
  amount?: InputMaybe<Scalars['Float']>;
  currency?: InputMaybe<Scalars['String']>;
  deleted?: InputMaybe<Scalars['Boolean']>;
  description?: InputMaybe<Scalars['String']>;
  itemStatus?: InputMaybe<Scalars['Int']>;
};

export type WishUpdateManyWithNestedWhereInput = {
  /** Update many input */
  data: WishUpdateManyInput;
  /** Document search */
  where: WishWhereInput;
};

export type WishUpdateOneInlineInput = {
  /** Connect existing Wish document */
  connect?: InputMaybe<WishWhereUniqueInput>;
  /** Create and connect one Wish document */
  create?: InputMaybe<WishCreateInput>;
  /** Delete currently connected Wish document */
  delete?: InputMaybe<Scalars['Boolean']>;
  /** Disconnect currently connected Wish document */
  disconnect?: InputMaybe<Scalars['Boolean']>;
  /** Update single Wish document */
  update?: InputMaybe<WishUpdateWithNestedWhereUniqueInput>;
  /** Upsert single Wish document */
  upsert?: InputMaybe<WishUpsertWithNestedWhereUniqueInput>;
};

export type WishUpdateWithNestedWhereUniqueInput = {
  /** Document to update */
  data: WishUpdateInput;
  /** Unique document search */
  where: WishWhereUniqueInput;
};

export type WishUpsertInput = {
  /** Create document if it didn't exist */
  create: WishCreateInput;
  /** Update document if it exists */
  update: WishUpdateInput;
};

export type WishUpsertWithNestedWhereUniqueInput = {
  /** Upsert data */
  data: WishUpsertInput;
  /** Unique document search */
  where: WishWhereUniqueInput;
};

/** This contains a set of filters that can be used to compare values internally */
export type WishWhereComparatorInput = {
  /** This field can be used to request to check if the entry is outdated by internal comparison */
  outdated_to?: InputMaybe<Scalars['Boolean']>;
};

/** Identifies documents */
export type WishWhereInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<WishWhereInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<WishWhereInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<WishWhereInput>>;
  /** Contains search across all appropriate fields. */
  _search?: InputMaybe<Scalars['String']>;
  amount?: InputMaybe<Scalars['Float']>;
  /** All values greater than the given value. */
  amount_gt?: InputMaybe<Scalars['Float']>;
  /** All values greater than or equal the given value. */
  amount_gte?: InputMaybe<Scalars['Float']>;
  /** All values that are contained in given list. */
  amount_in?: InputMaybe<Array<InputMaybe<Scalars['Float']>>>;
  /** All values less than the given value. */
  amount_lt?: InputMaybe<Scalars['Float']>;
  /** All values less than or equal the given value. */
  amount_lte?: InputMaybe<Scalars['Float']>;
  /** Any other value that exists and is not equal to the given value. */
  amount_not?: InputMaybe<Scalars['Float']>;
  /** All values that are not contained in given list. */
  amount_not_in?: InputMaybe<Array<InputMaybe<Scalars['Float']>>>;
  category?: InputMaybe<CategoryWhereInput>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  createdAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  createdAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  createdAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  createdAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  createdAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** Any other value that exists and is not equal to the given value. */
  createdAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  createdAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  createdBy?: InputMaybe<UserWhereInput>;
  currency?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  currency_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  currency_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  currency_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Any other value that exists and is not equal to the given value. */
  currency_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  currency_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  currency_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  currency_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  currency_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  currency_starts_with?: InputMaybe<Scalars['String']>;
  deleted?: InputMaybe<Scalars['Boolean']>;
  /** Any other value that exists and is not equal to the given value. */
  deleted_not?: InputMaybe<Scalars['Boolean']>;
  description?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  description_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  description_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  description_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Any other value that exists and is not equal to the given value. */
  description_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  description_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  description_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  description_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  description_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  description_starts_with?: InputMaybe<Scalars['String']>;
  documentInStages_every?: InputMaybe<WishWhereStageInput>;
  documentInStages_none?: InputMaybe<WishWhereStageInput>;
  documentInStages_some?: InputMaybe<WishWhereStageInput>;
  id?: InputMaybe<Scalars['ID']>;
  /** All values containing the given string. */
  id_contains?: InputMaybe<Scalars['ID']>;
  /** All values ending with the given string. */
  id_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are contained in given list. */
  id_in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Any other value that exists and is not equal to the given value. */
  id_not?: InputMaybe<Scalars['ID']>;
  /** All values not containing the given string. */
  id_not_contains?: InputMaybe<Scalars['ID']>;
  /** All values not ending with the given string */
  id_not_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are not contained in given list. */
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** All values not starting with the given string. */
  id_not_starts_with?: InputMaybe<Scalars['ID']>;
  /** All values starting with the given string. */
  id_starts_with?: InputMaybe<Scalars['ID']>;
  itemStatus?: InputMaybe<Scalars['Int']>;
  /** All values greater than the given value. */
  itemStatus_gt?: InputMaybe<Scalars['Int']>;
  /** All values greater than or equal the given value. */
  itemStatus_gte?: InputMaybe<Scalars['Int']>;
  /** All values that are contained in given list. */
  itemStatus_in?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  /** All values less than the given value. */
  itemStatus_lt?: InputMaybe<Scalars['Int']>;
  /** All values less than or equal the given value. */
  itemStatus_lte?: InputMaybe<Scalars['Int']>;
  /** Any other value that exists and is not equal to the given value. */
  itemStatus_not?: InputMaybe<Scalars['Int']>;
  /** All values that are not contained in given list. */
  itemStatus_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  publishedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  publishedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  publishedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  publishedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  publishedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  publishedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** Any other value that exists and is not equal to the given value. */
  publishedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  publishedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  publishedBy?: InputMaybe<UserWhereInput>;
  scheduledIn_every?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_none?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_some?: InputMaybe<ScheduledOperationWhereInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  updatedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  updatedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  updatedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  updatedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  updatedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** Any other value that exists and is not equal to the given value. */
  updatedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  updatedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  updatedBy?: InputMaybe<UserWhereInput>;
};

/** The document in stages filter allows specifying a stage entry to cross compare the same document between different stages */
export type WishWhereStageInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<WishWhereStageInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<WishWhereStageInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<WishWhereStageInput>>;
  /** This field contains fields which can be set as true or false to specify an internal comparison */
  compareWithParent?: InputMaybe<WishWhereComparatorInput>;
  /** Specify the stage to compare with */
  stage?: InputMaybe<Stage>;
};

/** References Wish record uniquely */
export type WishWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']>;
};

export enum _FilterKind {
  And = 'AND',
  Not = 'NOT',
  Or = 'OR',
  Contains = 'contains',
  ContainsAll = 'contains_all',
  ContainsNone = 'contains_none',
  ContainsSome = 'contains_some',
  EndsWith = 'ends_with',
  Eq = 'eq',
  EqNot = 'eq_not',
  Gt = 'gt',
  Gte = 'gte',
  In = 'in',
  JsonPathExists = 'json_path_exists',
  JsonValueRecursive = 'json_value_recursive',
  Lt = 'lt',
  Lte = 'lte',
  NotContains = 'not_contains',
  NotEndsWith = 'not_ends_with',
  NotIn = 'not_in',
  NotStartsWith = 'not_starts_with',
  RelationalEvery = 'relational_every',
  RelationalNone = 'relational_none',
  RelationalSingle = 'relational_single',
  RelationalSome = 'relational_some',
  Search = 'search',
  StartsWith = 'starts_with',
  UnionEmpty = 'union_empty',
  UnionEvery = 'union_every',
  UnionNone = 'union_none',
  UnionSingle = 'union_single',
  UnionSome = 'union_some',
}

export enum _MutationInputFieldKind {
  Enum = 'enum',
  Relation = 'relation',
  RichText = 'richText',
  RichTextWithEmbeds = 'richTextWithEmbeds',
  Scalar = 'scalar',
  Union = 'union',
  Virtual = 'virtual',
}

export enum _MutationKind {
  Create = 'create',
  Delete = 'delete',
  DeleteMany = 'deleteMany',
  Publish = 'publish',
  PublishMany = 'publishMany',
  SchedulePublish = 'schedulePublish',
  ScheduleUnpublish = 'scheduleUnpublish',
  Unpublish = 'unpublish',
  UnpublishMany = 'unpublishMany',
  Update = 'update',
  UpdateMany = 'updateMany',
  Upsert = 'upsert',
}

export enum _OrderDirection {
  Asc = 'asc',
  Desc = 'desc',
}

export enum _RelationInputCardinality {
  Many = 'many',
  One = 'one',
}

export enum _RelationInputKind {
  Create = 'create',
  Update = 'update',
}

export enum _RelationKind {
  Regular = 'regular',
  Union = 'union',
}

export enum _SystemDateTimeFieldVariation {
  Base = 'base',
  Combined = 'combined',
  Localization = 'localization',
}

export type AddAccountMutationVariables = Exact<{
  name: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
}>;

export type AddAccountMutation = {
  __typename?: 'Mutation';
  createAccount?: { __typename?: 'Account'; id: string } | null;
};

export type PublishAccountMutationVariables = Exact<{
  id: Scalars['ID'];
}>;

export type PublishAccountMutation = {
  __typename?: 'Mutation';
  publishAccount?: {
    __typename?: 'Account';
    name: string;
    email: string;
    password: string;
  } | null;
};

export type UpdateAccountMutationVariables = Exact<{
  id: Scalars['ID'];
  name: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
}>;

export type UpdateAccountMutation = {
  __typename?: 'Mutation';
  updateAccount?: {
    __typename?: 'Account';
    id: string;
    name: string;
    email: string;
    password: string;
  } | null;
};

export type AddExpenseMutationVariables = Exact<{
  amount: Scalars['Float'];
  card: Scalars['Boolean'];
  date: Scalars['Date'];
  deleted: Scalars['Boolean'];
  note: Scalars['String'];
  categoryID: Scalars['ID'];
  currency: Scalars['String'];
  paymentID: Scalars['ID'];
  variable: Scalars['Boolean'];
  travel: Scalars['Boolean'];
}>;

export type AddExpenseMutation = {
  __typename?: 'Mutation';
  createExpense?: { __typename?: 'Expense'; id: string } | null;
};

export type PublishExpenseMutationVariables = Exact<{
  id: Scalars['ID'];
}>;

export type PublishExpenseMutation = {
  __typename?: 'Mutation';
  publishExpense?: {
    __typename?: 'Expense';
    amount: number;
    card?: boolean | null;
    date?: any | null;
    deleted?: boolean | null;
    note?: string | null;
    currency: string;
    variable: boolean;
    travel: boolean;
    category?: {
      __typename?: 'Category';
      id: string;
      name: string;
      type: string;
    } | null;
    payment?: {
      __typename?: 'Wallet';
      id: string;
      amount: number;
      broker?: string | null;
      currency?: string | null;
      holder: string;
      deleted?: boolean | null;
      type: number;
    } | null;
  } | null;
};

export type UpdateExpenseMutationVariables = Exact<{
  id: Scalars['ID'];
  amount: Scalars['Float'];
  card: Scalars['Boolean'];
  date: Scalars['Date'];
  deleted: Scalars['Boolean'];
  note: Scalars['String'];
  categoryID: Scalars['ID'];
  currency: Scalars['String'];
  paymentID: Scalars['ID'];
  variable: Scalars['Boolean'];
  travel: Scalars['Boolean'];
}>;

export type UpdateExpenseMutation = {
  __typename?: 'Mutation';
  updateExpense?: {
    __typename?: 'Expense';
    id: string;
    amount: number;
    card?: boolean | null;
    date?: any | null;
    deleted?: boolean | null;
    note?: string | null;
    currency: string;
    variable: boolean;
    travel: boolean;
    category?: {
      __typename?: 'Category';
      id: string;
      name: string;
      type: string;
    } | null;
    payment?: {
      __typename?: 'Wallet';
      id: string;
      amount: number;
      broker?: string | null;
      currency?: string | null;
      holder: string;
      deleted?: boolean | null;
      type: number;
    } | null;
  } | null;
};

export type AddRevenueMutationVariables = Exact<{
  amount: Scalars['Float'];
  bank: Scalars['String'];
  date: Scalars['Date'];
  description: Scalars['String'];
  type: Scalars['String'];
  currency: Scalars['String'];
  itemStatus: Scalars['Int'];
  paymentID: Scalars['ID'];
}>;

export type AddRevenueMutation = {
  __typename?: 'Mutation';
  createRevenue?: { __typename?: 'Revenue'; id: string } | null;
};

export type PublishRevenueMutationVariables = Exact<{
  id: Scalars['ID'];
}>;

export type PublishRevenueMutation = {
  __typename?: 'Mutation';
  publishRevenue?: {
    __typename?: 'Revenue';
    amount: number;
    bank?: string | null;
    date: any;
    description: string;
    deleted?: boolean | null;
    type: string;
    currency: string;
    itemStatus: number;
    payment?: {
      __typename?: 'Wallet';
      id: string;
      amount: number;
      broker?: string | null;
      currency?: string | null;
      holder: string;
      deleted?: boolean | null;
      type: number;
    } | null;
  } | null;
};

export type UpdateRevenueMutationVariables = Exact<{
  id: Scalars['ID'];
  amount: Scalars['Float'];
  bank: Scalars['String'];
  date: Scalars['Date'];
  deleted: Scalars['Boolean'];
  description: Scalars['String'];
  type: Scalars['String'];
  currency: Scalars['String'];
  itemStatus: Scalars['Int'];
  paymentID: Scalars['ID'];
}>;

export type UpdateRevenueMutation = {
  __typename?: 'Mutation';
  updateRevenue?: {
    __typename?: 'Revenue';
    id: string;
    amount: number;
    bank?: string | null;
    date: any;
    deleted?: boolean | null;
    description: string;
    type: string;
    currency: string;
    itemStatus: number;
    payment?: {
      __typename?: 'Wallet';
      id: string;
      amount: number;
      broker?: string | null;
      currency?: string | null;
      holder: string;
      deleted?: boolean | null;
      type: number;
    } | null;
  } | null;
};

export type AddTransactionMutationVariables = Exact<{
  amountSent: Scalars['Float'];
  amountReceived: Scalars['Float'];
  date: Scalars['Date'];
  description: Scalars['String'];
  sourceID: Scalars['ID'];
  targetID: Scalars['ID'];
}>;

export type AddTransactionMutation = {
  __typename?: 'Mutation';
  createTransaction?: { __typename?: 'Transaction'; id: string } | null;
};

export type PublishTransactionMutationVariables = Exact<{
  id: Scalars['ID'];
}>;

export type PublishTransactionMutation = {
  __typename?: 'Mutation';
  publishTransaction?: {
    __typename?: 'Transaction';
    amountSent: number;
    amountReceived: number;
    date: any;
    description?: string | null;
    source?: { __typename?: 'Wallet'; id: string } | null;
    target?: { __typename?: 'Wallet'; id: string } | null;
  } | null;
};

export type UpdateTransactionMutationVariables = Exact<{
  id: Scalars['ID'];
  amountSent: Scalars['Float'];
  amountReceived: Scalars['Float'];
  date: Scalars['Date'];
  description: Scalars['String'];
  sourceID: Scalars['ID'];
  targetID: Scalars['ID'];
}>;

export type UpdateTransactionMutation = {
  __typename?: 'Mutation';
  updateTransaction?: {
    __typename?: 'Transaction';
    id: string;
    amountSent: number;
    amountReceived: number;
    description?: string | null;
    date: any;
    source?: { __typename?: 'Wallet'; id: string } | null;
    target?: { __typename?: 'Wallet'; id: string } | null;
  } | null;
};

export type AddWalletMutationVariables = Exact<{
  amount: Scalars['Float'];
  broker: Scalars['String'];
  currency: Scalars['String'];
  holder: Scalars['String'];
  type: Scalars['Int'];
}>;

export type AddWalletMutation = {
  __typename?: 'Mutation';
  createWallet?: { __typename?: 'Wallet'; id: string } | null;
};

export type PublishManyWalletsMutationVariables = Exact<{
  ids: Array<InputMaybe<Scalars['ID']>> | InputMaybe<Scalars['ID']>;
}>;

export type PublishManyWalletsMutation = {
  __typename?: 'Mutation';
  publishManyWallets: { __typename?: 'BatchPayload'; count: any };
};

export type PublishWalletMutationVariables = Exact<{
  id: Scalars['ID'];
}>;

export type PublishWalletMutation = {
  __typename?: 'Mutation';
  publishWallet?: {
    __typename?: 'Wallet';
    amount: number;
    broker?: string | null;
    currency?: string | null;
    deleted?: boolean | null;
    holder: string;
    type: number;
  } | null;
};

export type UpdateWalletAmountMutationVariables = Exact<{
  id: Scalars['ID'];
  amount: Scalars['Float'];
}>;

export type UpdateWalletAmountMutation = {
  __typename?: 'Mutation';
  updateWallet?: { __typename?: 'Wallet'; id: string; amount: number } | null;
};

export type UpdateWalletMutationVariables = Exact<{
  id: Scalars['ID'];
  amount: Scalars['Float'];
  broker: Scalars['String'];
  currency: Scalars['String'];
  deleted: Scalars['Boolean'];
  holder: Scalars['String'];
  type: Scalars['Int'];
}>;

export type UpdateWalletMutation = {
  __typename?: 'Mutation';
  updateWallet?: {
    __typename?: 'Wallet';
    id: string;
    amount: number;
    broker?: string | null;
    currency?: string | null;
    deleted?: boolean | null;
    holder: string;
    type: number;
  } | null;
};

export type AddWishMutationVariables = Exact<{
  amount: Scalars['Float'];
  description: Scalars['String'];
  currency: Scalars['String'];
  itemStatus: Scalars['Int'];
  categoryID: Scalars['ID'];
}>;

export type AddWishMutation = {
  __typename?: 'Mutation';
  createWish?: { __typename?: 'Wish'; id: string } | null;
};

export type PublishWishMutationVariables = Exact<{
  id: Scalars['ID'];
}>;

export type PublishWishMutation = {
  __typename?: 'Mutation';
  publishWish?: {
    __typename?: 'Wish';
    amount?: number | null;
    description?: string | null;
    deleted?: boolean | null;
    currency?: string | null;
    itemStatus?: number | null;
    category?: {
      __typename?: 'Category';
      id: string;
      name: string;
      type: string;
    } | null;
  } | null;
};

export type UpdateWishMutationVariables = Exact<{
  id: Scalars['ID'];
  amount: Scalars['Float'];
  deleted: Scalars['Boolean'];
  description: Scalars['String'];
  currency: Scalars['String'];
  itemStatus: Scalars['Int'];
  categoryID: Scalars['ID'];
}>;

export type UpdateWishMutation = {
  __typename?: 'Mutation';
  updateWish?: {
    __typename?: 'Wish';
    id: string;
    amount?: number | null;
    deleted?: boolean | null;
    description?: string | null;
    currency?: string | null;
    itemStatus?: number | null;
    category?: {
      __typename?: 'Category';
      id: string;
      name: string;
      type: string;
    } | null;
  } | null;
};

export type GetAccountByEmailQueryVariables = Exact<{
  email: Scalars['String'];
}>;

export type GetAccountByEmailQuery = {
  __typename?: 'Query';
  account?: {
    __typename?: 'Account';
    id: string;
    email: string;
    name: string;
    password: string;
    avatar?: { __typename?: 'Asset'; url: string } | null;
  } | null;
};

export type GetCategoriesQueryVariables = Exact<{ [key: string]: never }>;

export type GetCategoriesQuery = {
  __typename?: 'Query';
  categories: Array<{
    __typename?: 'Category';
    id: string;
    name: string;
    type: string;
  }>;
};

export type GetExpenseByIdQueryVariables = Exact<{
  expenseID: Scalars['ID'];
}>;

export type GetExpenseByIdQuery = {
  __typename?: 'Query';
  expense?: {
    __typename?: 'Expense';
    payment?: { __typename?: 'Wallet'; id: string } | null;
  } | null;
};

export type GetExpensesQueryVariables = Exact<{
  startDate: Scalars['Date'];
  endDate: Scalars['Date'];
}>;

export type GetExpensesQuery = {
  __typename?: 'Query';
  expenses: Array<{
    __typename?: 'Expense';
    id: string;
    amount: number;
    card?: boolean | null;
    date?: any | null;
    deleted?: boolean | null;
    note?: string | null;
    currency: string;
    variable: boolean;
    travel: boolean;
    category?: {
      __typename?: 'Category';
      id: string;
      name: string;
      type: string;
    } | null;
    account?: { __typename?: 'Account'; name: string } | null;
    payment?: {
      __typename?: 'Wallet';
      id: string;
      amount: number;
      broker?: string | null;
      deleted?: boolean | null;
      currency?: string | null;
      holder: string;
      type: number;
    } | null;
  }>;
};

export type GetRevenuesQueryVariables = Exact<{ [key: string]: never }>;

export type GetRevenuesQuery = {
  __typename?: 'Query';
  revenues: Array<{
    __typename?: 'Revenue';
    id: string;
    amount: number;
    bank?: string | null;
    date: any;
    deleted?: boolean | null;
    description: string;
    type: string;
    currency: string;
    itemStatus: number;
    payment?: {
      __typename?: 'Wallet';
      id: string;
      amount: number;
      broker?: string | null;
      deleted?: boolean | null;
      currency?: string | null;
      holder: string;
      type: number;
    } | null;
  }>;
};

export type GetTransactionsQueryVariables = Exact<{ [key: string]: never }>;

export type GetTransactionsQuery = {
  __typename?: 'Query';
  transactions: Array<{
    __typename?: 'Transaction';
    id: string;
    amountSent: number;
    amountReceived: number;
    date: any;
    description?: string | null;
    source?: {
      __typename?: 'Wallet';
      id: string;
      broker?: string | null;
      holder: string;
    } | null;
    target?: {
      __typename?: 'Wallet';
      id: string;
      broker?: string | null;
      holder: string;
    } | null;
  }>;
};

export type GetWalletsQueryVariables = Exact<{ [key: string]: never }>;

export type GetWalletsQuery = {
  __typename?: 'Query';
  wallets: Array<{
    __typename?: 'Wallet';
    id: string;
    amount: number;
    broker?: string | null;
    deleted?: boolean | null;
    currency?: string | null;
    holder: string;
    type: number;
  }>;
};

export type GetWishesQueryVariables = Exact<{ [key: string]: never }>;

export type GetWishesQuery = {
  __typename?: 'Query';
  wishes: Array<{
    __typename?: 'Wish';
    id: string;
    amount?: number | null;
    deleted?: boolean | null;
    description?: string | null;
    currency?: string | null;
    itemStatus?: number | null;
    category?: {
      __typename?: 'Category';
      id: string;
      name: string;
      type: string;
    } | null;
  }>;
};

export const AddAccountDocument = gql`
  mutation addAccount($name: String!, $email: String!, $password: String!) {
    createAccount(data: { name: $name, email: $email, password: $password }) {
      id
    }
  }
`;

/**
 * __useAddAccountMutation__
 *
 * To run a mutation, you first call `useAddAccountMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useAddAccountMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useAddAccountMutation({
 *   variables: {
 *     name: // value for 'name'
 *     email: // value for 'email'
 *     password: // value for 'password'
 *   },
 * });
 */
export function useAddAccountMutation(
  options:
    | VueApolloComposable.UseMutationOptions<
        AddAccountMutation,
        AddAccountMutationVariables
      >
    | ReactiveFunction<
        VueApolloComposable.UseMutationOptions<
          AddAccountMutation,
          AddAccountMutationVariables
        >
      >
) {
  return VueApolloComposable.useMutation<
    AddAccountMutation,
    AddAccountMutationVariables
  >(AddAccountDocument, options);
}
export type AddAccountMutationCompositionFunctionResult =
  VueApolloComposable.UseMutationReturn<
    AddAccountMutation,
    AddAccountMutationVariables
  >;
export const PublishAccountDocument = gql`
  mutation publishAccount($id: ID!) {
    publishAccount(where: { id: $id }, to: PUBLISHED) {
      name
      email
      password
    }
  }
`;

/**
 * __usePublishAccountMutation__
 *
 * To run a mutation, you first call `usePublishAccountMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `usePublishAccountMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = usePublishAccountMutation({
 *   variables: {
 *     id: // value for 'id'
 *   },
 * });
 */
export function usePublishAccountMutation(
  options:
    | VueApolloComposable.UseMutationOptions<
        PublishAccountMutation,
        PublishAccountMutationVariables
      >
    | ReactiveFunction<
        VueApolloComposable.UseMutationOptions<
          PublishAccountMutation,
          PublishAccountMutationVariables
        >
      >
) {
  return VueApolloComposable.useMutation<
    PublishAccountMutation,
    PublishAccountMutationVariables
  >(PublishAccountDocument, options);
}
export type PublishAccountMutationCompositionFunctionResult =
  VueApolloComposable.UseMutationReturn<
    PublishAccountMutation,
    PublishAccountMutationVariables
  >;
export const UpdateAccountDocument = gql`
  mutation updateAccount(
    $id: ID!
    $name: String!
    $email: String!
    $password: String!
  ) {
    updateAccount(
      data: { name: $name, email: $email, password: $password }
      where: { id: $id }
    ) {
      id
      name
      email
      password
    }
  }
`;

/**
 * __useUpdateAccountMutation__
 *
 * To run a mutation, you first call `useUpdateAccountMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useUpdateAccountMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useUpdateAccountMutation({
 *   variables: {
 *     id: // value for 'id'
 *     name: // value for 'name'
 *     email: // value for 'email'
 *     password: // value for 'password'
 *   },
 * });
 */
export function useUpdateAccountMutation(
  options:
    | VueApolloComposable.UseMutationOptions<
        UpdateAccountMutation,
        UpdateAccountMutationVariables
      >
    | ReactiveFunction<
        VueApolloComposable.UseMutationOptions<
          UpdateAccountMutation,
          UpdateAccountMutationVariables
        >
      >
) {
  return VueApolloComposable.useMutation<
    UpdateAccountMutation,
    UpdateAccountMutationVariables
  >(UpdateAccountDocument, options);
}
export type UpdateAccountMutationCompositionFunctionResult =
  VueApolloComposable.UseMutationReturn<
    UpdateAccountMutation,
    UpdateAccountMutationVariables
  >;
export const AddExpenseDocument = gql`
  mutation addExpense(
    $amount: Float!
    $card: Boolean!
    $date: Date!
    $deleted: Boolean!
    $note: String!
    $categoryID: ID!
    $currency: String!
    $paymentID: ID!
    $variable: Boolean!
    $travel: Boolean!
  ) {
    createExpense(
      data: {
        amount: $amount
        card: $card
        date: $date
        deleted: $deleted
        note: $note
        category: { connect: { id: $categoryID } }
        currency: $currency
        payment: { connect: { id: $paymentID } }
        variable: $variable
        travel: $travel
      }
    ) {
      id
    }
  }
`;

/**
 * __useAddExpenseMutation__
 *
 * To run a mutation, you first call `useAddExpenseMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useAddExpenseMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useAddExpenseMutation({
 *   variables: {
 *     amount: // value for 'amount'
 *     card: // value for 'card'
 *     date: // value for 'date'
 *     deleted: // value for 'deleted'
 *     note: // value for 'note'
 *     categoryID: // value for 'categoryID'
 *     currency: // value for 'currency'
 *     paymentID: // value for 'paymentID'
 *     variable: // value for 'variable'
 *     travel: // value for 'travel'
 *   },
 * });
 */
export function useAddExpenseMutation(
  options:
    | VueApolloComposable.UseMutationOptions<
        AddExpenseMutation,
        AddExpenseMutationVariables
      >
    | ReactiveFunction<
        VueApolloComposable.UseMutationOptions<
          AddExpenseMutation,
          AddExpenseMutationVariables
        >
      >
) {
  return VueApolloComposable.useMutation<
    AddExpenseMutation,
    AddExpenseMutationVariables
  >(AddExpenseDocument, options);
}
export type AddExpenseMutationCompositionFunctionResult =
  VueApolloComposable.UseMutationReturn<
    AddExpenseMutation,
    AddExpenseMutationVariables
  >;
export const PublishExpenseDocument = gql`
  mutation publishExpense($id: ID!) {
    publishExpense(where: { id: $id }, to: PUBLISHED) {
      amount
      card
      category {
        id
        name
        type
      }
      date
      deleted
      note
      currency
      payment {
        id
        amount
        broker
        currency
        holder
        deleted
        type
      }
      variable
      travel
    }
  }
`;

/**
 * __usePublishExpenseMutation__
 *
 * To run a mutation, you first call `usePublishExpenseMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `usePublishExpenseMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = usePublishExpenseMutation({
 *   variables: {
 *     id: // value for 'id'
 *   },
 * });
 */
export function usePublishExpenseMutation(
  options:
    | VueApolloComposable.UseMutationOptions<
        PublishExpenseMutation,
        PublishExpenseMutationVariables
      >
    | ReactiveFunction<
        VueApolloComposable.UseMutationOptions<
          PublishExpenseMutation,
          PublishExpenseMutationVariables
        >
      >
) {
  return VueApolloComposable.useMutation<
    PublishExpenseMutation,
    PublishExpenseMutationVariables
  >(PublishExpenseDocument, options);
}
export type PublishExpenseMutationCompositionFunctionResult =
  VueApolloComposable.UseMutationReturn<
    PublishExpenseMutation,
    PublishExpenseMutationVariables
  >;
export const UpdateExpenseDocument = gql`
  mutation updateExpense(
    $id: ID!
    $amount: Float!
    $card: Boolean!
    $date: Date!
    $deleted: Boolean!
    $note: String!
    $categoryID: ID!
    $currency: String!
    $paymentID: ID!
    $variable: Boolean!
    $travel: Boolean!
  ) {
    updateExpense(
      data: {
        amount: $amount
        card: $card
        date: $date
        deleted: $deleted
        note: $note
        category: { connect: { id: $categoryID } }
        currency: $currency
        payment: { connect: { id: $paymentID } }
        variable: $variable
        travel: $travel
      }
      where: { id: $id }
    ) {
      id
      amount
      card
      date
      deleted
      note
      category {
        id
        name
        type
      }
      currency
      payment {
        id
        amount
        broker
        currency
        holder
        deleted
        type
      }
      variable
      travel
    }
  }
`;

/**
 * __useUpdateExpenseMutation__
 *
 * To run a mutation, you first call `useUpdateExpenseMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useUpdateExpenseMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useUpdateExpenseMutation({
 *   variables: {
 *     id: // value for 'id'
 *     amount: // value for 'amount'
 *     card: // value for 'card'
 *     date: // value for 'date'
 *     deleted: // value for 'deleted'
 *     note: // value for 'note'
 *     categoryID: // value for 'categoryID'
 *     currency: // value for 'currency'
 *     paymentID: // value for 'paymentID'
 *     variable: // value for 'variable'
 *     travel: // value for 'travel'
 *   },
 * });
 */
export function useUpdateExpenseMutation(
  options:
    | VueApolloComposable.UseMutationOptions<
        UpdateExpenseMutation,
        UpdateExpenseMutationVariables
      >
    | ReactiveFunction<
        VueApolloComposable.UseMutationOptions<
          UpdateExpenseMutation,
          UpdateExpenseMutationVariables
        >
      >
) {
  return VueApolloComposable.useMutation<
    UpdateExpenseMutation,
    UpdateExpenseMutationVariables
  >(UpdateExpenseDocument, options);
}
export type UpdateExpenseMutationCompositionFunctionResult =
  VueApolloComposable.UseMutationReturn<
    UpdateExpenseMutation,
    UpdateExpenseMutationVariables
  >;
export const AddRevenueDocument = gql`
  mutation addRevenue(
    $amount: Float!
    $bank: String!
    $date: Date!
    $description: String!
    $type: String!
    $currency: String!
    $itemStatus: Int!
    $paymentID: ID!
  ) {
    createRevenue(
      data: {
        amount: $amount
        bank: $bank
        date: $date
        deleted: false
        description: $description
        type: $type
        currency: $currency
        itemStatus: $itemStatus
        payment: { connect: { id: $paymentID } }
      }
    ) {
      id
    }
  }
`;

/**
 * __useAddRevenueMutation__
 *
 * To run a mutation, you first call `useAddRevenueMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useAddRevenueMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useAddRevenueMutation({
 *   variables: {
 *     amount: // value for 'amount'
 *     bank: // value for 'bank'
 *     date: // value for 'date'
 *     description: // value for 'description'
 *     type: // value for 'type'
 *     currency: // value for 'currency'
 *     itemStatus: // value for 'itemStatus'
 *     paymentID: // value for 'paymentID'
 *   },
 * });
 */
export function useAddRevenueMutation(
  options:
    | VueApolloComposable.UseMutationOptions<
        AddRevenueMutation,
        AddRevenueMutationVariables
      >
    | ReactiveFunction<
        VueApolloComposable.UseMutationOptions<
          AddRevenueMutation,
          AddRevenueMutationVariables
        >
      >
) {
  return VueApolloComposable.useMutation<
    AddRevenueMutation,
    AddRevenueMutationVariables
  >(AddRevenueDocument, options);
}
export type AddRevenueMutationCompositionFunctionResult =
  VueApolloComposable.UseMutationReturn<
    AddRevenueMutation,
    AddRevenueMutationVariables
  >;
export const PublishRevenueDocument = gql`
  mutation publishRevenue($id: ID!) {
    publishRevenue(where: { id: $id }, to: PUBLISHED) {
      amount
      bank
      date
      description
      deleted
      type
      currency
      itemStatus
      payment {
        id
        amount
        broker
        currency
        holder
        deleted
        type
      }
    }
  }
`;

/**
 * __usePublishRevenueMutation__
 *
 * To run a mutation, you first call `usePublishRevenueMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `usePublishRevenueMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = usePublishRevenueMutation({
 *   variables: {
 *     id: // value for 'id'
 *   },
 * });
 */
export function usePublishRevenueMutation(
  options:
    | VueApolloComposable.UseMutationOptions<
        PublishRevenueMutation,
        PublishRevenueMutationVariables
      >
    | ReactiveFunction<
        VueApolloComposable.UseMutationOptions<
          PublishRevenueMutation,
          PublishRevenueMutationVariables
        >
      >
) {
  return VueApolloComposable.useMutation<
    PublishRevenueMutation,
    PublishRevenueMutationVariables
  >(PublishRevenueDocument, options);
}
export type PublishRevenueMutationCompositionFunctionResult =
  VueApolloComposable.UseMutationReturn<
    PublishRevenueMutation,
    PublishRevenueMutationVariables
  >;
export const UpdateRevenueDocument = gql`
  mutation updateRevenue(
    $id: ID!
    $amount: Float!
    $bank: String!
    $date: Date!
    $deleted: Boolean!
    $description: String!
    $type: String!
    $currency: String!
    $itemStatus: Int!
    $paymentID: ID!
  ) {
    updateRevenue(
      data: {
        amount: $amount
        bank: $bank
        date: $date
        deleted: $deleted
        description: $description
        type: $type
        currency: $currency
        itemStatus: $itemStatus
        payment: { connect: { id: $paymentID } }
      }
      where: { id: $id }
    ) {
      id
      amount
      bank
      date
      deleted
      description
      type
      currency
      itemStatus
      payment {
        id
        amount
        broker
        currency
        holder
        deleted
        type
      }
    }
  }
`;

/**
 * __useUpdateRevenueMutation__
 *
 * To run a mutation, you first call `useUpdateRevenueMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useUpdateRevenueMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useUpdateRevenueMutation({
 *   variables: {
 *     id: // value for 'id'
 *     amount: // value for 'amount'
 *     bank: // value for 'bank'
 *     date: // value for 'date'
 *     deleted: // value for 'deleted'
 *     description: // value for 'description'
 *     type: // value for 'type'
 *     currency: // value for 'currency'
 *     itemStatus: // value for 'itemStatus'
 *     paymentID: // value for 'paymentID'
 *   },
 * });
 */
export function useUpdateRevenueMutation(
  options:
    | VueApolloComposable.UseMutationOptions<
        UpdateRevenueMutation,
        UpdateRevenueMutationVariables
      >
    | ReactiveFunction<
        VueApolloComposable.UseMutationOptions<
          UpdateRevenueMutation,
          UpdateRevenueMutationVariables
        >
      >
) {
  return VueApolloComposable.useMutation<
    UpdateRevenueMutation,
    UpdateRevenueMutationVariables
  >(UpdateRevenueDocument, options);
}
export type UpdateRevenueMutationCompositionFunctionResult =
  VueApolloComposable.UseMutationReturn<
    UpdateRevenueMutation,
    UpdateRevenueMutationVariables
  >;
export const AddTransactionDocument = gql`
  mutation addTransaction(
    $amountSent: Float!
    $amountReceived: Float!
    $date: Date!
    $description: String!
    $sourceID: ID!
    $targetID: ID!
  ) {
    createTransaction(
      data: {
        amountSent: $amountSent
        amountReceived: $amountReceived
        date: $date
        description: $description
        source: { connect: { id: $sourceID } }
        target: { connect: { id: $targetID } }
      }
    ) {
      id
    }
  }
`;

/**
 * __useAddTransactionMutation__
 *
 * To run a mutation, you first call `useAddTransactionMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useAddTransactionMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useAddTransactionMutation({
 *   variables: {
 *     amountSent: // value for 'amountSent'
 *     amountReceived: // value for 'amountReceived'
 *     date: // value for 'date'
 *     description: // value for 'description'
 *     sourceID: // value for 'sourceID'
 *     targetID: // value for 'targetID'
 *   },
 * });
 */
export function useAddTransactionMutation(
  options:
    | VueApolloComposable.UseMutationOptions<
        AddTransactionMutation,
        AddTransactionMutationVariables
      >
    | ReactiveFunction<
        VueApolloComposable.UseMutationOptions<
          AddTransactionMutation,
          AddTransactionMutationVariables
        >
      >
) {
  return VueApolloComposable.useMutation<
    AddTransactionMutation,
    AddTransactionMutationVariables
  >(AddTransactionDocument, options);
}
export type AddTransactionMutationCompositionFunctionResult =
  VueApolloComposable.UseMutationReturn<
    AddTransactionMutation,
    AddTransactionMutationVariables
  >;
export const PublishTransactionDocument = gql`
  mutation publishTransaction($id: ID!) {
    publishTransaction(where: { id: $id }, to: PUBLISHED) {
      amountSent
      amountReceived
      date
      description
      source {
        id
      }
      target {
        id
      }
    }
  }
`;

/**
 * __usePublishTransactionMutation__
 *
 * To run a mutation, you first call `usePublishTransactionMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `usePublishTransactionMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = usePublishTransactionMutation({
 *   variables: {
 *     id: // value for 'id'
 *   },
 * });
 */
export function usePublishTransactionMutation(
  options:
    | VueApolloComposable.UseMutationOptions<
        PublishTransactionMutation,
        PublishTransactionMutationVariables
      >
    | ReactiveFunction<
        VueApolloComposable.UseMutationOptions<
          PublishTransactionMutation,
          PublishTransactionMutationVariables
        >
      >
) {
  return VueApolloComposable.useMutation<
    PublishTransactionMutation,
    PublishTransactionMutationVariables
  >(PublishTransactionDocument, options);
}
export type PublishTransactionMutationCompositionFunctionResult =
  VueApolloComposable.UseMutationReturn<
    PublishTransactionMutation,
    PublishTransactionMutationVariables
  >;
export const UpdateTransactionDocument = gql`
  mutation updateTransaction(
    $id: ID!
    $amountSent: Float!
    $amountReceived: Float!
    $date: Date!
    $description: String!
    $sourceID: ID!
    $targetID: ID!
  ) {
    updateTransaction(
      data: {
        amountSent: $amountSent
        amountReceived: $amountReceived
        description: $description
        date: $date
        source: { connect: { id: $sourceID } }
        target: { connect: { id: $targetID } }
      }
      where: { id: $id }
    ) {
      id
      amountSent
      amountReceived
      description
      date
      source {
        id
      }
      target {
        id
      }
    }
  }
`;

/**
 * __useUpdateTransactionMutation__
 *
 * To run a mutation, you first call `useUpdateTransactionMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTransactionMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useUpdateTransactionMutation({
 *   variables: {
 *     id: // value for 'id'
 *     amountSent: // value for 'amountSent'
 *     amountReceived: // value for 'amountReceived'
 *     date: // value for 'date'
 *     description: // value for 'description'
 *     sourceID: // value for 'sourceID'
 *     targetID: // value for 'targetID'
 *   },
 * });
 */
export function useUpdateTransactionMutation(
  options:
    | VueApolloComposable.UseMutationOptions<
        UpdateTransactionMutation,
        UpdateTransactionMutationVariables
      >
    | ReactiveFunction<
        VueApolloComposable.UseMutationOptions<
          UpdateTransactionMutation,
          UpdateTransactionMutationVariables
        >
      >
) {
  return VueApolloComposable.useMutation<
    UpdateTransactionMutation,
    UpdateTransactionMutationVariables
  >(UpdateTransactionDocument, options);
}
export type UpdateTransactionMutationCompositionFunctionResult =
  VueApolloComposable.UseMutationReturn<
    UpdateTransactionMutation,
    UpdateTransactionMutationVariables
  >;
export const AddWalletDocument = gql`
  mutation addWallet(
    $amount: Float!
    $broker: String!
    $currency: String!
    $holder: String!
    $type: Int!
  ) {
    createWallet(
      data: {
        amount: $amount
        broker: $broker
        currency: $currency
        deleted: false
        holder: $holder
        type: $type
      }
    ) {
      id
    }
  }
`;

/**
 * __useAddWalletMutation__
 *
 * To run a mutation, you first call `useAddWalletMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useAddWalletMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useAddWalletMutation({
 *   variables: {
 *     amount: // value for 'amount'
 *     broker: // value for 'broker'
 *     currency: // value for 'currency'
 *     holder: // value for 'holder'
 *     type: // value for 'type'
 *   },
 * });
 */
export function useAddWalletMutation(
  options:
    | VueApolloComposable.UseMutationOptions<
        AddWalletMutation,
        AddWalletMutationVariables
      >
    | ReactiveFunction<
        VueApolloComposable.UseMutationOptions<
          AddWalletMutation,
          AddWalletMutationVariables
        >
      >
) {
  return VueApolloComposable.useMutation<
    AddWalletMutation,
    AddWalletMutationVariables
  >(AddWalletDocument, options);
}
export type AddWalletMutationCompositionFunctionResult =
  VueApolloComposable.UseMutationReturn<
    AddWalletMutation,
    AddWalletMutationVariables
  >;
export const PublishManyWalletsDocument = gql`
  mutation publishManyWallets($ids: [ID]!) {
    publishManyWallets(to: PUBLISHED, where: { id_in: $ids }) {
      count
    }
  }
`;

/**
 * __usePublishManyWalletsMutation__
 *
 * To run a mutation, you first call `usePublishManyWalletsMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `usePublishManyWalletsMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = usePublishManyWalletsMutation({
 *   variables: {
 *     ids: // value for 'ids'
 *   },
 * });
 */
export function usePublishManyWalletsMutation(
  options:
    | VueApolloComposable.UseMutationOptions<
        PublishManyWalletsMutation,
        PublishManyWalletsMutationVariables
      >
    | ReactiveFunction<
        VueApolloComposable.UseMutationOptions<
          PublishManyWalletsMutation,
          PublishManyWalletsMutationVariables
        >
      >
) {
  return VueApolloComposable.useMutation<
    PublishManyWalletsMutation,
    PublishManyWalletsMutationVariables
  >(PublishManyWalletsDocument, options);
}
export type PublishManyWalletsMutationCompositionFunctionResult =
  VueApolloComposable.UseMutationReturn<
    PublishManyWalletsMutation,
    PublishManyWalletsMutationVariables
  >;
export const PublishWalletDocument = gql`
  mutation publishWallet($id: ID!) {
    publishWallet(where: { id: $id }, to: PUBLISHED) {
      amount
      broker
      currency
      deleted
      holder
      type
    }
  }
`;

/**
 * __usePublishWalletMutation__
 *
 * To run a mutation, you first call `usePublishWalletMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `usePublishWalletMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = usePublishWalletMutation({
 *   variables: {
 *     id: // value for 'id'
 *   },
 * });
 */
export function usePublishWalletMutation(
  options:
    | VueApolloComposable.UseMutationOptions<
        PublishWalletMutation,
        PublishWalletMutationVariables
      >
    | ReactiveFunction<
        VueApolloComposable.UseMutationOptions<
          PublishWalletMutation,
          PublishWalletMutationVariables
        >
      >
) {
  return VueApolloComposable.useMutation<
    PublishWalletMutation,
    PublishWalletMutationVariables
  >(PublishWalletDocument, options);
}
export type PublishWalletMutationCompositionFunctionResult =
  VueApolloComposable.UseMutationReturn<
    PublishWalletMutation,
    PublishWalletMutationVariables
  >;
export const UpdateWalletAmountDocument = gql`
  mutation updateWalletAmount($id: ID!, $amount: Float!) {
    updateWallet(data: { amount: $amount }, where: { id: $id }) {
      id
      amount
    }
  }
`;

/**
 * __useUpdateWalletAmountMutation__
 *
 * To run a mutation, you first call `useUpdateWalletAmountMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useUpdateWalletAmountMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useUpdateWalletAmountMutation({
 *   variables: {
 *     id: // value for 'id'
 *     amount: // value for 'amount'
 *   },
 * });
 */
export function useUpdateWalletAmountMutation(
  options:
    | VueApolloComposable.UseMutationOptions<
        UpdateWalletAmountMutation,
        UpdateWalletAmountMutationVariables
      >
    | ReactiveFunction<
        VueApolloComposable.UseMutationOptions<
          UpdateWalletAmountMutation,
          UpdateWalletAmountMutationVariables
        >
      >
) {
  return VueApolloComposable.useMutation<
    UpdateWalletAmountMutation,
    UpdateWalletAmountMutationVariables
  >(UpdateWalletAmountDocument, options);
}
export type UpdateWalletAmountMutationCompositionFunctionResult =
  VueApolloComposable.UseMutationReturn<
    UpdateWalletAmountMutation,
    UpdateWalletAmountMutationVariables
  >;
export const UpdateWalletDocument = gql`
  mutation updateWallet(
    $id: ID!
    $amount: Float!
    $broker: String!
    $currency: String!
    $deleted: Boolean!
    $holder: String!
    $type: Int!
  ) {
    updateWallet(
      data: {
        amount: $amount
        broker: $broker
        currency: $currency
        deleted: $deleted
        holder: $holder
        type: $type
      }
      where: { id: $id }
    ) {
      id
      amount
      broker
      currency
      deleted
      holder
      type
    }
  }
`;

/**
 * __useUpdateWalletMutation__
 *
 * To run a mutation, you first call `useUpdateWalletMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useUpdateWalletMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useUpdateWalletMutation({
 *   variables: {
 *     id: // value for 'id'
 *     amount: // value for 'amount'
 *     broker: // value for 'broker'
 *     currency: // value for 'currency'
 *     deleted: // value for 'deleted'
 *     holder: // value for 'holder'
 *     type: // value for 'type'
 *   },
 * });
 */
export function useUpdateWalletMutation(
  options:
    | VueApolloComposable.UseMutationOptions<
        UpdateWalletMutation,
        UpdateWalletMutationVariables
      >
    | ReactiveFunction<
        VueApolloComposable.UseMutationOptions<
          UpdateWalletMutation,
          UpdateWalletMutationVariables
        >
      >
) {
  return VueApolloComposable.useMutation<
    UpdateWalletMutation,
    UpdateWalletMutationVariables
  >(UpdateWalletDocument, options);
}
export type UpdateWalletMutationCompositionFunctionResult =
  VueApolloComposable.UseMutationReturn<
    UpdateWalletMutation,
    UpdateWalletMutationVariables
  >;
export const AddWishDocument = gql`
  mutation addWish(
    $amount: Float!
    $description: String!
    $currency: String!
    $itemStatus: Int!
    $categoryID: ID!
  ) {
    createWish(
      data: {
        amount: $amount
        description: $description
        deleted: false
        currency: $currency
        itemStatus: $itemStatus
        category: { connect: { id: $categoryID } }
      }
    ) {
      id
    }
  }
`;

/**
 * __useAddWishMutation__
 *
 * To run a mutation, you first call `useAddWishMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useAddWishMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useAddWishMutation({
 *   variables: {
 *     amount: // value for 'amount'
 *     description: // value for 'description'
 *     currency: // value for 'currency'
 *     itemStatus: // value for 'itemStatus'
 *     categoryID: // value for 'categoryID'
 *   },
 * });
 */
export function useAddWishMutation(
  options:
    | VueApolloComposable.UseMutationOptions<
        AddWishMutation,
        AddWishMutationVariables
      >
    | ReactiveFunction<
        VueApolloComposable.UseMutationOptions<
          AddWishMutation,
          AddWishMutationVariables
        >
      >
) {
  return VueApolloComposable.useMutation<
    AddWishMutation,
    AddWishMutationVariables
  >(AddWishDocument, options);
}
export type AddWishMutationCompositionFunctionResult =
  VueApolloComposable.UseMutationReturn<
    AddWishMutation,
    AddWishMutationVariables
  >;
export const PublishWishDocument = gql`
  mutation publishWish($id: ID!) {
    publishWish(where: { id: $id }, to: PUBLISHED) {
      amount
      description
      deleted
      currency
      itemStatus
      category {
        id
        name
        type
      }
    }
  }
`;

/**
 * __usePublishWishMutation__
 *
 * To run a mutation, you first call `usePublishWishMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `usePublishWishMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = usePublishWishMutation({
 *   variables: {
 *     id: // value for 'id'
 *   },
 * });
 */
export function usePublishWishMutation(
  options:
    | VueApolloComposable.UseMutationOptions<
        PublishWishMutation,
        PublishWishMutationVariables
      >
    | ReactiveFunction<
        VueApolloComposable.UseMutationOptions<
          PublishWishMutation,
          PublishWishMutationVariables
        >
      >
) {
  return VueApolloComposable.useMutation<
    PublishWishMutation,
    PublishWishMutationVariables
  >(PublishWishDocument, options);
}
export type PublishWishMutationCompositionFunctionResult =
  VueApolloComposable.UseMutationReturn<
    PublishWishMutation,
    PublishWishMutationVariables
  >;
export const UpdateWishDocument = gql`
  mutation updateWish(
    $id: ID!
    $amount: Float!
    $deleted: Boolean!
    $description: String!
    $currency: String!
    $itemStatus: Int!
    $categoryID: ID!
  ) {
    updateWish(
      data: {
        amount: $amount
        deleted: $deleted
        description: $description
        currency: $currency
        itemStatus: $itemStatus
        category: { connect: { id: $categoryID } }
      }
      where: { id: $id }
    ) {
      id
      amount
      deleted
      description
      currency
      itemStatus
      category {
        id
        name
        type
      }
    }
  }
`;

/**
 * __useUpdateWishMutation__
 *
 * To run a mutation, you first call `useUpdateWishMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useUpdateWishMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useUpdateWishMutation({
 *   variables: {
 *     id: // value for 'id'
 *     amount: // value for 'amount'
 *     deleted: // value for 'deleted'
 *     description: // value for 'description'
 *     currency: // value for 'currency'
 *     itemStatus: // value for 'itemStatus'
 *     categoryID: // value for 'categoryID'
 *   },
 * });
 */
export function useUpdateWishMutation(
  options:
    | VueApolloComposable.UseMutationOptions<
        UpdateWishMutation,
        UpdateWishMutationVariables
      >
    | ReactiveFunction<
        VueApolloComposable.UseMutationOptions<
          UpdateWishMutation,
          UpdateWishMutationVariables
        >
      >
) {
  return VueApolloComposable.useMutation<
    UpdateWishMutation,
    UpdateWishMutationVariables
  >(UpdateWishDocument, options);
}
export type UpdateWishMutationCompositionFunctionResult =
  VueApolloComposable.UseMutationReturn<
    UpdateWishMutation,
    UpdateWishMutationVariables
  >;
export const GetAccountByEmailDocument = gql`
  query GetAccountByEmail($email: String!) {
    account(where: { email: $email }) {
      id
      email
      name
      password
      avatar {
        url
      }
    }
  }
`;

/**
 * __useGetAccountByEmailQuery__
 *
 * To run a query within a Vue component, call `useGetAccountByEmailQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAccountByEmailQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useGetAccountByEmailQuery({
 *   email: // value for 'email'
 * });
 */
export function useGetAccountByEmailQuery(
  variables:
    | GetAccountByEmailQueryVariables
    | VueCompositionApi.Ref<GetAccountByEmailQueryVariables>
    | ReactiveFunction<GetAccountByEmailQueryVariables>,
  options:
    | VueApolloComposable.UseQueryOptions<
        GetAccountByEmailQuery,
        GetAccountByEmailQueryVariables
      >
    | VueCompositionApi.Ref<
        VueApolloComposable.UseQueryOptions<
          GetAccountByEmailQuery,
          GetAccountByEmailQueryVariables
        >
      >
    | ReactiveFunction<
        VueApolloComposable.UseQueryOptions<
          GetAccountByEmailQuery,
          GetAccountByEmailQueryVariables
        >
      > = {}
) {
  return VueApolloComposable.useQuery<
    GetAccountByEmailQuery,
    GetAccountByEmailQueryVariables
  >(GetAccountByEmailDocument, variables, options);
}
export function useGetAccountByEmailLazyQuery(
  variables:
    | GetAccountByEmailQueryVariables
    | VueCompositionApi.Ref<GetAccountByEmailQueryVariables>
    | ReactiveFunction<GetAccountByEmailQueryVariables>,
  options:
    | VueApolloComposable.UseQueryOptions<
        GetAccountByEmailQuery,
        GetAccountByEmailQueryVariables
      >
    | VueCompositionApi.Ref<
        VueApolloComposable.UseQueryOptions<
          GetAccountByEmailQuery,
          GetAccountByEmailQueryVariables
        >
      >
    | ReactiveFunction<
        VueApolloComposable.UseQueryOptions<
          GetAccountByEmailQuery,
          GetAccountByEmailQueryVariables
        >
      > = {}
) {
  return VueApolloComposable.useLazyQuery<
    GetAccountByEmailQuery,
    GetAccountByEmailQueryVariables
  >(GetAccountByEmailDocument, variables, options);
}
export type GetAccountByEmailQueryCompositionFunctionResult =
  VueApolloComposable.UseQueryReturn<
    GetAccountByEmailQuery,
    GetAccountByEmailQueryVariables
  >;
export const GetCategoriesDocument = gql`
  query GetCategories {
    categories(first: 100, orderBy: name_ASC) {
      id
      name
      type
    }
  }
`;

/**
 * __useGetCategoriesQuery__
 *
 * To run a query within a Vue component, call `useGetCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCategoriesQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useGetCategoriesQuery();
 */
export function useGetCategoriesQuery(
  options:
    | VueApolloComposable.UseQueryOptions<
        GetCategoriesQuery,
        GetCategoriesQueryVariables
      >
    | VueCompositionApi.Ref<
        VueApolloComposable.UseQueryOptions<
          GetCategoriesQuery,
          GetCategoriesQueryVariables
        >
      >
    | ReactiveFunction<
        VueApolloComposable.UseQueryOptions<
          GetCategoriesQuery,
          GetCategoriesQueryVariables
        >
      > = {}
) {
  return VueApolloComposable.useQuery<
    GetCategoriesQuery,
    GetCategoriesQueryVariables
  >(GetCategoriesDocument, {}, options);
}
export function useGetCategoriesLazyQuery(
  options:
    | VueApolloComposable.UseQueryOptions<
        GetCategoriesQuery,
        GetCategoriesQueryVariables
      >
    | VueCompositionApi.Ref<
        VueApolloComposable.UseQueryOptions<
          GetCategoriesQuery,
          GetCategoriesQueryVariables
        >
      >
    | ReactiveFunction<
        VueApolloComposable.UseQueryOptions<
          GetCategoriesQuery,
          GetCategoriesQueryVariables
        >
      > = {}
) {
  return VueApolloComposable.useLazyQuery<
    GetCategoriesQuery,
    GetCategoriesQueryVariables
  >(GetCategoriesDocument, {}, options);
}
export type GetCategoriesQueryCompositionFunctionResult =
  VueApolloComposable.UseQueryReturn<
    GetCategoriesQuery,
    GetCategoriesQueryVariables
  >;
export const GetExpenseByIdDocument = gql`
  query GetExpenseByID($expenseID: ID!) {
    expense(where: { id: $expenseID }) {
      payment {
        id
      }
    }
  }
`;

/**
 * __useGetExpenseByIdQuery__
 *
 * To run a query within a Vue component, call `useGetExpenseByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetExpenseByIdQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useGetExpenseByIdQuery({
 *   expenseID: // value for 'expenseID'
 * });
 */
export function useGetExpenseByIdQuery(
  variables:
    | GetExpenseByIdQueryVariables
    | VueCompositionApi.Ref<GetExpenseByIdQueryVariables>
    | ReactiveFunction<GetExpenseByIdQueryVariables>,
  options:
    | VueApolloComposable.UseQueryOptions<
        GetExpenseByIdQuery,
        GetExpenseByIdQueryVariables
      >
    | VueCompositionApi.Ref<
        VueApolloComposable.UseQueryOptions<
          GetExpenseByIdQuery,
          GetExpenseByIdQueryVariables
        >
      >
    | ReactiveFunction<
        VueApolloComposable.UseQueryOptions<
          GetExpenseByIdQuery,
          GetExpenseByIdQueryVariables
        >
      > = {}
) {
  return VueApolloComposable.useQuery<
    GetExpenseByIdQuery,
    GetExpenseByIdQueryVariables
  >(GetExpenseByIdDocument, variables, options);
}
export function useGetExpenseByIdLazyQuery(
  variables:
    | GetExpenseByIdQueryVariables
    | VueCompositionApi.Ref<GetExpenseByIdQueryVariables>
    | ReactiveFunction<GetExpenseByIdQueryVariables>,
  options:
    | VueApolloComposable.UseQueryOptions<
        GetExpenseByIdQuery,
        GetExpenseByIdQueryVariables
      >
    | VueCompositionApi.Ref<
        VueApolloComposable.UseQueryOptions<
          GetExpenseByIdQuery,
          GetExpenseByIdQueryVariables
        >
      >
    | ReactiveFunction<
        VueApolloComposable.UseQueryOptions<
          GetExpenseByIdQuery,
          GetExpenseByIdQueryVariables
        >
      > = {}
) {
  return VueApolloComposable.useLazyQuery<
    GetExpenseByIdQuery,
    GetExpenseByIdQueryVariables
  >(GetExpenseByIdDocument, variables, options);
}
export type GetExpenseByIdQueryCompositionFunctionResult =
  VueApolloComposable.UseQueryReturn<
    GetExpenseByIdQuery,
    GetExpenseByIdQueryVariables
  >;
export const GetExpensesDocument = gql`
  query GetExpenses($startDate: Date!, $endDate: Date!) {
    expenses(
      first: 100
      orderBy: date_DESC
      where: { date_gte: $startDate, date_lte: $endDate }
    ) {
      id
      amount
      card
      category {
        id
        name
        type
      }
      date
      deleted
      note
      account {
        name
      }
      currency
      payment {
        id
        amount
        broker
        deleted
        currency
        holder
        type
      }
      variable
      travel
    }
  }
`;

/**
 * __useGetExpensesQuery__
 *
 * To run a query within a Vue component, call `useGetExpensesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetExpensesQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useGetExpensesQuery({
 *   startDate: // value for 'startDate'
 *   endDate: // value for 'endDate'
 * });
 */
export function useGetExpensesQuery(
  variables:
    | GetExpensesQueryVariables
    | VueCompositionApi.Ref<GetExpensesQueryVariables>
    | ReactiveFunction<GetExpensesQueryVariables>,
  options:
    | VueApolloComposable.UseQueryOptions<
        GetExpensesQuery,
        GetExpensesQueryVariables
      >
    | VueCompositionApi.Ref<
        VueApolloComposable.UseQueryOptions<
          GetExpensesQuery,
          GetExpensesQueryVariables
        >
      >
    | ReactiveFunction<
        VueApolloComposable.UseQueryOptions<
          GetExpensesQuery,
          GetExpensesQueryVariables
        >
      > = {}
) {
  return VueApolloComposable.useQuery<
    GetExpensesQuery,
    GetExpensesQueryVariables
  >(GetExpensesDocument, variables, options);
}
export function useGetExpensesLazyQuery(
  variables:
    | GetExpensesQueryVariables
    | VueCompositionApi.Ref<GetExpensesQueryVariables>
    | ReactiveFunction<GetExpensesQueryVariables>,
  options:
    | VueApolloComposable.UseQueryOptions<
        GetExpensesQuery,
        GetExpensesQueryVariables
      >
    | VueCompositionApi.Ref<
        VueApolloComposable.UseQueryOptions<
          GetExpensesQuery,
          GetExpensesQueryVariables
        >
      >
    | ReactiveFunction<
        VueApolloComposable.UseQueryOptions<
          GetExpensesQuery,
          GetExpensesQueryVariables
        >
      > = {}
) {
  return VueApolloComposable.useLazyQuery<
    GetExpensesQuery,
    GetExpensesQueryVariables
  >(GetExpensesDocument, variables, options);
}
export type GetExpensesQueryCompositionFunctionResult =
  VueApolloComposable.UseQueryReturn<
    GetExpensesQuery,
    GetExpensesQueryVariables
  >;
export const GetRevenuesDocument = gql`
  query GetRevenues {
    revenues(first: 100, orderBy: date_DESC) {
      id
      amount
      bank
      date
      deleted
      description
      type
      currency
      itemStatus
      payment {
        id
        amount
        broker
        deleted
        currency
        holder
        type
      }
    }
  }
`;

/**
 * __useGetRevenuesQuery__
 *
 * To run a query within a Vue component, call `useGetRevenuesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRevenuesQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useGetRevenuesQuery();
 */
export function useGetRevenuesQuery(
  options:
    | VueApolloComposable.UseQueryOptions<
        GetRevenuesQuery,
        GetRevenuesQueryVariables
      >
    | VueCompositionApi.Ref<
        VueApolloComposable.UseQueryOptions<
          GetRevenuesQuery,
          GetRevenuesQueryVariables
        >
      >
    | ReactiveFunction<
        VueApolloComposable.UseQueryOptions<
          GetRevenuesQuery,
          GetRevenuesQueryVariables
        >
      > = {}
) {
  return VueApolloComposable.useQuery<
    GetRevenuesQuery,
    GetRevenuesQueryVariables
  >(GetRevenuesDocument, {}, options);
}
export function useGetRevenuesLazyQuery(
  options:
    | VueApolloComposable.UseQueryOptions<
        GetRevenuesQuery,
        GetRevenuesQueryVariables
      >
    | VueCompositionApi.Ref<
        VueApolloComposable.UseQueryOptions<
          GetRevenuesQuery,
          GetRevenuesQueryVariables
        >
      >
    | ReactiveFunction<
        VueApolloComposable.UseQueryOptions<
          GetRevenuesQuery,
          GetRevenuesQueryVariables
        >
      > = {}
) {
  return VueApolloComposable.useLazyQuery<
    GetRevenuesQuery,
    GetRevenuesQueryVariables
  >(GetRevenuesDocument, {}, options);
}
export type GetRevenuesQueryCompositionFunctionResult =
  VueApolloComposable.UseQueryReturn<
    GetRevenuesQuery,
    GetRevenuesQueryVariables
  >;
export const GetTransactionsDocument = gql`
  query GetTransactions {
    transactions(first: 100, orderBy: createdAt_DESC) {
      id
      amountSent
      amountReceived
      date
      description
      source {
        id
        broker
        holder
      }
      target {
        id
        broker
        holder
      }
    }
  }
`;

/**
 * __useGetTransactionsQuery__
 *
 * To run a query within a Vue component, call `useGetTransactionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTransactionsQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useGetTransactionsQuery();
 */
export function useGetTransactionsQuery(
  options:
    | VueApolloComposable.UseQueryOptions<
        GetTransactionsQuery,
        GetTransactionsQueryVariables
      >
    | VueCompositionApi.Ref<
        VueApolloComposable.UseQueryOptions<
          GetTransactionsQuery,
          GetTransactionsQueryVariables
        >
      >
    | ReactiveFunction<
        VueApolloComposable.UseQueryOptions<
          GetTransactionsQuery,
          GetTransactionsQueryVariables
        >
      > = {}
) {
  return VueApolloComposable.useQuery<
    GetTransactionsQuery,
    GetTransactionsQueryVariables
  >(GetTransactionsDocument, {}, options);
}
export function useGetTransactionsLazyQuery(
  options:
    | VueApolloComposable.UseQueryOptions<
        GetTransactionsQuery,
        GetTransactionsQueryVariables
      >
    | VueCompositionApi.Ref<
        VueApolloComposable.UseQueryOptions<
          GetTransactionsQuery,
          GetTransactionsQueryVariables
        >
      >
    | ReactiveFunction<
        VueApolloComposable.UseQueryOptions<
          GetTransactionsQuery,
          GetTransactionsQueryVariables
        >
      > = {}
) {
  return VueApolloComposable.useLazyQuery<
    GetTransactionsQuery,
    GetTransactionsQueryVariables
  >(GetTransactionsDocument, {}, options);
}
export type GetTransactionsQueryCompositionFunctionResult =
  VueApolloComposable.UseQueryReturn<
    GetTransactionsQuery,
    GetTransactionsQueryVariables
  >;
export const GetWalletsDocument = gql`
  query GetWallets {
    wallets(first: 100, orderBy: createdAt_DESC) {
      id
      amount
      broker
      deleted
      currency
      holder
      type
    }
  }
`;

/**
 * __useGetWalletsQuery__
 *
 * To run a query within a Vue component, call `useGetWalletsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetWalletsQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useGetWalletsQuery();
 */
export function useGetWalletsQuery(
  options:
    | VueApolloComposable.UseQueryOptions<
        GetWalletsQuery,
        GetWalletsQueryVariables
      >
    | VueCompositionApi.Ref<
        VueApolloComposable.UseQueryOptions<
          GetWalletsQuery,
          GetWalletsQueryVariables
        >
      >
    | ReactiveFunction<
        VueApolloComposable.UseQueryOptions<
          GetWalletsQuery,
          GetWalletsQueryVariables
        >
      > = {}
) {
  return VueApolloComposable.useQuery<
    GetWalletsQuery,
    GetWalletsQueryVariables
  >(GetWalletsDocument, {}, options);
}
export function useGetWalletsLazyQuery(
  options:
    | VueApolloComposable.UseQueryOptions<
        GetWalletsQuery,
        GetWalletsQueryVariables
      >
    | VueCompositionApi.Ref<
        VueApolloComposable.UseQueryOptions<
          GetWalletsQuery,
          GetWalletsQueryVariables
        >
      >
    | ReactiveFunction<
        VueApolloComposable.UseQueryOptions<
          GetWalletsQuery,
          GetWalletsQueryVariables
        >
      > = {}
) {
  return VueApolloComposable.useLazyQuery<
    GetWalletsQuery,
    GetWalletsQueryVariables
  >(GetWalletsDocument, {}, options);
}
export type GetWalletsQueryCompositionFunctionResult =
  VueApolloComposable.UseQueryReturn<GetWalletsQuery, GetWalletsQueryVariables>;
export const GetWishesDocument = gql`
  query GetWishes {
    wishes(first: 100, orderBy: amount_DESC) {
      id
      amount
      deleted
      description
      currency
      itemStatus
      category {
        id
        name
        type
      }
    }
  }
`;

/**
 * __useGetWishesQuery__
 *
 * To run a query within a Vue component, call `useGetWishesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetWishesQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useGetWishesQuery();
 */
export function useGetWishesQuery(
  options:
    | VueApolloComposable.UseQueryOptions<
        GetWishesQuery,
        GetWishesQueryVariables
      >
    | VueCompositionApi.Ref<
        VueApolloComposable.UseQueryOptions<
          GetWishesQuery,
          GetWishesQueryVariables
        >
      >
    | ReactiveFunction<
        VueApolloComposable.UseQueryOptions<
          GetWishesQuery,
          GetWishesQueryVariables
        >
      > = {}
) {
  return VueApolloComposable.useQuery<GetWishesQuery, GetWishesQueryVariables>(
    GetWishesDocument,
    {},
    options
  );
}
export function useGetWishesLazyQuery(
  options:
    | VueApolloComposable.UseQueryOptions<
        GetWishesQuery,
        GetWishesQueryVariables
      >
    | VueCompositionApi.Ref<
        VueApolloComposable.UseQueryOptions<
          GetWishesQuery,
          GetWishesQueryVariables
        >
      >
    | ReactiveFunction<
        VueApolloComposable.UseQueryOptions<
          GetWishesQuery,
          GetWishesQueryVariables
        >
      > = {}
) {
  return VueApolloComposable.useLazyQuery<
    GetWishesQuery,
    GetWishesQueryVariables
  >(GetWishesDocument, {}, options);
}
export type GetWishesQueryCompositionFunctionResult =
  VueApolloComposable.UseQueryReturn<GetWishesQuery, GetWishesQueryVariables>;
