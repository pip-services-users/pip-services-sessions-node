// package: sessions_v1
// file: sessions_v1.proto

import * as jspb from "google-protobuf";

export class ErrorDescription extends jspb.Message {
  getType(): string;
  setType(value: string): void;

  getCategory(): string;
  setCategory(value: string): void;

  getCode(): string;
  setCode(value: string): void;

  getCorrelationId(): string;
  setCorrelationId(value: string): void;

  getStatus(): string;
  setStatus(value: string): void;

  getMessage(): string;
  setMessage(value: string): void;

  getCause(): string;
  setCause(value: string): void;

  getStackTrace(): string;
  setStackTrace(value: string): void;

  getDetailsMap(): jspb.Map<string, string>;
  clearDetailsMap(): void;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ErrorDescription.AsObject;
  static toObject(includeInstance: boolean, msg: ErrorDescription): ErrorDescription.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ErrorDescription, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ErrorDescription;
  static deserializeBinaryFromReader(message: ErrorDescription, reader: jspb.BinaryReader): ErrorDescription;
}

export namespace ErrorDescription {
  export type AsObject = {
    type: string,
    category: string,
    code: string,
    correlationId: string,
    status: string,
    message: string,
    cause: string,
    stackTrace: string,
    detailsMap: Array<[string, string]>,
  }
}

export class PagingParams extends jspb.Message {
  getSkip(): number;
  setSkip(value: number): void;

  getTake(): number;
  setTake(value: number): void;

  getTotal(): boolean;
  setTotal(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PagingParams.AsObject;
  static toObject(includeInstance: boolean, msg: PagingParams): PagingParams.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: PagingParams, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PagingParams;
  static deserializeBinaryFromReader(message: PagingParams, reader: jspb.BinaryReader): PagingParams;
}

export namespace PagingParams {
  export type AsObject = {
    skip: number,
    take: number,
    total: boolean,
  }
}

export class Session extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  getUserId(): string;
  setUserId(value: string): void;

  getUserName(): string;
  setUserName(value: string): void;

  getActive(): boolean;
  setActive(value: boolean): void;

  getOpenTime(): string;
  setOpenTime(value: string): void;

  getCloseTime(): string;
  setCloseTime(value: string): void;

  getRequestTime(): string;
  setRequestTime(value: string): void;

  getAddress(): string;
  setAddress(value: string): void;

  getClient(): string;
  setClient(value: string): void;

  getUser(): string;
  setUser(value: string): void;

  getData(): string;
  setData(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Session.AsObject;
  static toObject(includeInstance: boolean, msg: Session): Session.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Session, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Session;
  static deserializeBinaryFromReader(message: Session, reader: jspb.BinaryReader): Session;
}

export namespace Session {
  export type AsObject = {
    id: string,
    userId: string,
    userName: string,
    active: boolean,
    openTime: string,
    closeTime: string,
    requestTime: string,
    address: string,
    client: string,
    user: string,
    data: string,
  }
}

export class SessionPage extends jspb.Message {
  getTotal(): number;
  setTotal(value: number): void;

  clearDataList(): void;
  getDataList(): Array<Session>;
  setDataList(value: Array<Session>): void;
  addData(value?: Session, index?: number): Session;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SessionPage.AsObject;
  static toObject(includeInstance: boolean, msg: SessionPage): SessionPage.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SessionPage, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SessionPage;
  static deserializeBinaryFromReader(message: SessionPage, reader: jspb.BinaryReader): SessionPage;
}

export namespace SessionPage {
  export type AsObject = {
    total: number,
    dataList: Array<Session.AsObject>,
  }
}

export class SessionPageRequest extends jspb.Message {
  getCorrelationId(): string;
  setCorrelationId(value: string): void;

  getFilterMap(): jspb.Map<string, string>;
  clearFilterMap(): void;
  hasPaging(): boolean;
  clearPaging(): void;
  getPaging(): PagingParams | undefined;
  setPaging(value?: PagingParams): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SessionPageRequest.AsObject;
  static toObject(includeInstance: boolean, msg: SessionPageRequest): SessionPageRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SessionPageRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SessionPageRequest;
  static deserializeBinaryFromReader(message: SessionPageRequest, reader: jspb.BinaryReader): SessionPageRequest;
}

export namespace SessionPageRequest {
  export type AsObject = {
    correlationId: string,
    filterMap: Array<[string, string]>,
    paging?: PagingParams.AsObject,
  }
}

export class SessionPageReply extends jspb.Message {
  hasError(): boolean;
  clearError(): void;
  getError(): ErrorDescription | undefined;
  setError(value?: ErrorDescription): void;

  hasPage(): boolean;
  clearPage(): void;
  getPage(): SessionPage | undefined;
  setPage(value?: SessionPage): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SessionPageReply.AsObject;
  static toObject(includeInstance: boolean, msg: SessionPageReply): SessionPageReply.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SessionPageReply, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SessionPageReply;
  static deserializeBinaryFromReader(message: SessionPageReply, reader: jspb.BinaryReader): SessionPageReply;
}

export namespace SessionPageReply {
  export type AsObject = {
    error?: ErrorDescription.AsObject,
    page?: SessionPage.AsObject,
  }
}

export class SessionIdRequest extends jspb.Message {
  getCorrelationId(): string;
  setCorrelationId(value: string): void;

  getSessionId(): string;
  setSessionId(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SessionIdRequest.AsObject;
  static toObject(includeInstance: boolean, msg: SessionIdRequest): SessionIdRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SessionIdRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SessionIdRequest;
  static deserializeBinaryFromReader(message: SessionIdRequest, reader: jspb.BinaryReader): SessionIdRequest;
}

export namespace SessionIdRequest {
  export type AsObject = {
    correlationId: string,
    sessionId: string,
  }
}

export class SessionOpenRequest extends jspb.Message {
  getCorrelationId(): string;
  setCorrelationId(value: string): void;

  getUserId(): string;
  setUserId(value: string): void;

  getUserName(): string;
  setUserName(value: string): void;

  getAddress(): string;
  setAddress(value: string): void;

  getClient(): string;
  setClient(value: string): void;

  getUser(): string;
  setUser(value: string): void;

  getData(): string;
  setData(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SessionOpenRequest.AsObject;
  static toObject(includeInstance: boolean, msg: SessionOpenRequest): SessionOpenRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SessionOpenRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SessionOpenRequest;
  static deserializeBinaryFromReader(message: SessionOpenRequest, reader: jspb.BinaryReader): SessionOpenRequest;
}

export namespace SessionOpenRequest {
  export type AsObject = {
    correlationId: string,
    userId: string,
    userName: string,
    address: string,
    client: string,
    user: string,
    data: string,
  }
}

export class SessionStoreDataRequest extends jspb.Message {
  getCorrelationId(): string;
  setCorrelationId(value: string): void;

  getSessionId(): string;
  setSessionId(value: string): void;

  getData(): string;
  setData(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SessionStoreDataRequest.AsObject;
  static toObject(includeInstance: boolean, msg: SessionStoreDataRequest): SessionStoreDataRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SessionStoreDataRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SessionStoreDataRequest;
  static deserializeBinaryFromReader(message: SessionStoreDataRequest, reader: jspb.BinaryReader): SessionStoreDataRequest;
}

export namespace SessionStoreDataRequest {
  export type AsObject = {
    correlationId: string,
    sessionId: string,
    data: string,
  }
}

export class SessionUpdateUserRequest extends jspb.Message {
  getCorrelationId(): string;
  setCorrelationId(value: string): void;

  getSessionId(): string;
  setSessionId(value: string): void;

  getUser(): string;
  setUser(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SessionUpdateUserRequest.AsObject;
  static toObject(includeInstance: boolean, msg: SessionUpdateUserRequest): SessionUpdateUserRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SessionUpdateUserRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SessionUpdateUserRequest;
  static deserializeBinaryFromReader(message: SessionUpdateUserRequest, reader: jspb.BinaryReader): SessionUpdateUserRequest;
}

export namespace SessionUpdateUserRequest {
  export type AsObject = {
    correlationId: string,
    sessionId: string,
    user: string,
  }
}

export class SessionEmptyRequest extends jspb.Message {
  getCorrelationId(): string;
  setCorrelationId(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SessionEmptyRequest.AsObject;
  static toObject(includeInstance: boolean, msg: SessionEmptyRequest): SessionEmptyRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SessionEmptyRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SessionEmptyRequest;
  static deserializeBinaryFromReader(message: SessionEmptyRequest, reader: jspb.BinaryReader): SessionEmptyRequest;
}

export namespace SessionEmptyRequest {
  export type AsObject = {
    correlationId: string,
  }
}

export class SessionObjectRequest extends jspb.Message {
  getCorrelationId(): string;
  setCorrelationId(value: string): void;

  hasSession(): boolean;
  clearSession(): void;
  getSession(): Session | undefined;
  setSession(value?: Session): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SessionObjectRequest.AsObject;
  static toObject(includeInstance: boolean, msg: SessionObjectRequest): SessionObjectRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SessionObjectRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SessionObjectRequest;
  static deserializeBinaryFromReader(message: SessionObjectRequest, reader: jspb.BinaryReader): SessionObjectRequest;
}

export namespace SessionObjectRequest {
  export type AsObject = {
    correlationId: string,
    session?: Session.AsObject,
  }
}

export class SessionObjectReply extends jspb.Message {
  hasError(): boolean;
  clearError(): void;
  getError(): ErrorDescription | undefined;
  setError(value?: ErrorDescription): void;

  hasSession(): boolean;
  clearSession(): void;
  getSession(): Session | undefined;
  setSession(value?: Session): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SessionObjectReply.AsObject;
  static toObject(includeInstance: boolean, msg: SessionObjectReply): SessionObjectReply.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SessionObjectReply, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SessionObjectReply;
  static deserializeBinaryFromReader(message: SessionObjectReply, reader: jspb.BinaryReader): SessionObjectReply;
}

export namespace SessionObjectReply {
  export type AsObject = {
    error?: ErrorDescription.AsObject,
    session?: Session.AsObject,
  }
}

export class SessionEmptyReply extends jspb.Message {
  hasError(): boolean;
  clearError(): void;
  getError(): ErrorDescription | undefined;
  setError(value?: ErrorDescription): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SessionEmptyReply.AsObject;
  static toObject(includeInstance: boolean, msg: SessionEmptyReply): SessionEmptyReply.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SessionEmptyReply, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SessionEmptyReply;
  static deserializeBinaryFromReader(message: SessionEmptyReply, reader: jspb.BinaryReader): SessionEmptyReply;
}

export namespace SessionEmptyReply {
  export type AsObject = {
    error?: ErrorDescription.AsObject,
  }
}

