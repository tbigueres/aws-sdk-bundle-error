import { PutObjectCommand, PutObjectCommandInput, S3Client } from "@aws-sdk/client-s3";
import { fromIni } from "@aws-sdk/credential-provider-ini";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";


export async function handler(): Promise<any> {

   
    const client = new S3Client({
        region: "eu-west-3",
        credentials: fromIni({ profile: 'default' })
    });

    const bucketName = "calibration";

    const params: PutObjectCommandInput = {
        Bucket: bucketName,
        Key: "file.tar.gz",
    };


    const command = new PutObjectCommand(params);

    const signedUrl = await getSignedUrl(client, command, { expiresIn: 4800 });
    return signedUrl;
}

