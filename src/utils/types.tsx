export type Message = {
    id: string;
    content: string;
    whoSent: string; // user name or "bot"
    whenSent: Date; // timestamp
}

export type Chat = {
    _id: string;
    title: string;
    messages: Message[]; // array of strings of markdown with math and images, where each \ is escaped. 
    __v: number;
}

export type User = {
    provider?: string;
    _id: string;
    userId: string;
    email?: string;
    username: string;
    name: string;
    created_at?: Date;
    updated_at?: Date;
    role?: string;
    chats: Chat[] | []; // array of chat ids or shallow copy of chats
    __v: number;
};

export type FileData = {
    meta: S3MetaData;
    parsedContent: string | null; // from pdf to mathpix markdown
}

export type S3MetaData = { // from AWS S3 Object interface definition
    /**
     * The name that you assign to an object. You use the object key to retrieve the object.
     */
    Key: string;
    /**
     * Creation date of the object.
     */
    LastModified: Date;
    /**
     * The entity tag is a hash of the object. The ETag reflects changes only to the contents of an object, not its metadata. The ETag may or may not be an MD5 digest of the object data.
     *  Whether or not it is depends on how the object was created and how it is encrypted as described below:   Objects created by the PUT Object, POST Object, or Copy operation, 
     * or through the Amazon Web Services Management Console, and are encrypted by SSE-S3 or plaintext, have ETags that are an MD5 digest of their object data.   Objects created by the PUT Object, 
     * POST Object, or Copy operation, or through the Amazon Web Services Management Console, and are encrypted by SSE-C or SSE-KMS, have ETags that are not an MD5 digest of their object data.  
     *  If an object is created by either the Multipart Upload or Part Copy operation, the ETag is not an MD5 digest, regardless of the method of encryption. If an object is larger than 16 MB, 
     * the Amazon Web Services Management Console will upload or copy that object as a Multipart Upload, and therefore the ETag will not be an MD5 digest.  
     */
    ETag: string;
    /**
     * The algorithm that was used to create a checksum of the object.
     */
    ChecksumAlgorithm: ChecksumAlgorithmList;
    /**
     * Size in bytes of the object
     */
    Size: number;
    /**
     * The class of storage used to store the object.
     */
    StorageClass: ObjectStorageClass;
    /**
     * The owner of the object
     */
    Owner: Owner;
    /**
     * Specifies the restoration status of an object. Objects in certain storage classes must be restored before they can be retrieved. For more information about these storage classes and how to work with archived objects, see  Working with archived objects in the Amazon S3 User Guide.
     */
    RestoreStatus: RestoreStatus;
}

export type ChecksumAlgorithm = "CRC32" | "CRC32C" | "SHA1" | "SHA256" | string;
export type ChecksumAlgorithmList = ChecksumAlgorithm[];
export type ObjectStorageClass = "STANDARD" | "REDUCED_REDUNDANCY" | "GLACIER" | "STANDARD_IA" | "ONEZONE_IA" | "INTELLIGENT_TIERING" | "DEEP_ARCHIVE" | "OUTPOSTS" | "GLACIER_IR" | "SNOW" | string;
export interface Owner {
    /**
     * Container for the display name of the owner. This value is only supported in the following Amazon Web Services Regions:   US East (N. Virginia)   US West (N. California)   US West (Oregon)   Asia Pacific (Singapore)   Asia Pacific (Sydney)   Asia Pacific (Tokyo)   Europe (Ireland)   South America (São Paulo)  
     */
    DisplayName?: string;
    /**
     * Container for the ID of the owner.
     */
    ID?: string;
}
export interface RestoreStatus {
    /**
     * Specifies whether the object is currently being restored. If the object restoration is in progress, the header returns the value TRUE. For example:  x-amz-optional-object-attributes: IsRestoreInProgress="true"  If the object restoration has completed, the header returns the value FALSE. For example:  x-amz-optional-object-attributes: IsRestoreInProgress="false", RestoreExpiryDate="2012-12-21T00:00:00.000Z"  If the object hasn't been restored, there is no header response.
     */
    IsRestoreInProgress?: boolean;
    /**
     * Indicates when the restored copy will expire. This value is populated only if the object has already been restored. For example:  x-amz-optional-object-attributes: IsRestoreInProgress="false", RestoreExpiryDate="2012-12-21T00:00:00.000Z" 
     */
    RestoreExpiryDate?: Date;
}