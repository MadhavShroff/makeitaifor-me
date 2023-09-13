export type MessageVersion = {
    _id: string;
    text: string;
    type: 'user' | 'ai';
    isActive: boolean;
    versionNumber: number;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
}

export type Message = {
    _id: string;
    versions: MessageVersion[] | string[];
    previousVersion: string | null;
}

export type Chat = {
    _id: string;
    title: string;
    createdAt: Date;
    updatedAt: Date;
    messages: Message[] | string[]; // array of strings of markdown with math and images, where each \ is escaped. 
    __v: number;
}

export type User = {
    provider?: string;
    _id: string; // mongo object id
    userId: string; // cognito user id
    email?: string;
    username: string;
    name: string;
    createdAt?: Date;
    updatedAt?: Date;
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

export function isMessageVersion(obj: any): obj is MessageVersion {
    if (!obj) {
        console.log("isMessageVersion Failure: obj is undefined or null");
        return false;
    }

    if (!(typeof obj._id === 'string' || typeof obj._id === 'number')) {
        console.log(`isMessageVersion Failure: _id is of type ${typeof obj._id}. Expected type: string or number.`);
        return false;
    }

    if (typeof obj.text !== 'string') {
        console.log(`isMessageVersion Failure: text is of type ${typeof obj.text}. Expected type: string.`);
        return false;
    }

    if (!(obj.type === 'user' || obj.type === 'ai')) {
        console.log(`isMessageVersion Failure: type has value ${obj.type}. Expected value: 'user' or 'ai'.`);
        return false;
    }

    if (typeof obj.isActive !== 'boolean') {
        console.log(`isMessageVersion Failure: isActive is of type ${typeof obj.isActive}. Expected type: boolean.`);
        return false;
    }

    if (typeof obj.versionNumber !== 'number') {
        console.log(`isMessageVersion Failure: versionNumber is of type ${typeof obj.versionNumber}. Expected type: number.`);
        return false;
    }

    if (!((obj.createdAt instanceof Date) || (typeof obj.createdAt === 'string'))) {
        console.log(`isMessageVersion Failure: createdAt is of type ${typeof obj.createdAt}. Expected type: Date or string.`);
        return false;
    }

    if (!((obj.updatedAt instanceof Date) || (typeof obj.updatedAt === 'string'))) {
        console.log(`isMessageVersion Failure: updatedAt is of type ${typeof obj.updatedAt}. Expected type: Date or string.`);
        return false;
    }

    if (typeof obj.__v !== 'number') {
        console.log(`isMessageVersion Failure: __v is of type ${typeof obj.__v}. Expected type: number.`);
        return false;
    }

    return true;
}


export function isMessage(obj: any): obj is Message {
    if (!obj) {
        console.log("isMessage Failure: obj is undefined or null");
        return false;
    }

    if (typeof obj._id !== 'string') {
        console.log(`isMessage Failure: _id is of type ${typeof obj._id}. Expected type: string.`);
        return false;
    }

    if (!(Array.isArray(obj.versions))) {
        console.log(`isMessage Failure: versions is of type ${typeof obj.versions}. Expected type: array.`);
        return false;
    }

    for (let version of obj.versions) {
        if (typeof version === 'string') {
            continue;
        }
        if (!isMessageVersion(version)) {
            console.log("isMessage Failure: One of the versions is not of type MessageVersion.");
            return false;
        }
    }

    return true;
}

export function areMessages(objs: any[]): objs is Message[] {
    if (!objs) {
        console.log("areMessages Failure: objs is undefined or null");
        return false;
    }

    for (let obj of objs) {
        if (!isMessage(obj)) {
            console.log("areMessages Failure: One of the objs is not of type Message.");
            return false;
        }
    }

    return true;
}

export const isMessageVersionArray = (versions: any[]) : versions is MessageVersion[] => {
    return versions.length > 0 && typeof versions[0] !== 'string';
}





