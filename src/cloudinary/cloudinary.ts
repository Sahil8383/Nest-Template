import { Injectable } from '@nestjs/common';
import { UploadApiErrorResponse, UploadApiResponse, v2 } from 'cloudinary';
import { ConfigService } from '@nestjs/config';
import toStream = require('buffer-to-stream');

@Injectable()
export class Cloudinary {
    constructor() {
        const configService = new ConfigService();
        v2.config({
            cloud_name: configService.get<string>('CLOUDINARY_CLOUD_NAME'),
            api_key: configService.get<string>('CLOUDINARY_API_KEY'),
            api_secret: configService.get<string>('CLOUDINARY_API_SECRET'),
        });
    }

    async uploadFile(
        file: any,
    ): Promise<UploadApiResponse | UploadApiErrorResponse> {
        return new Promise((resolve, reject) => {
            const upload = v2.uploader.upload_stream((error, result) => {
                if (error) return reject(error);
                resolve(result);
            });
            toStream(file.buffer).pipe(upload);
        });
    }
}

// import { v2 } from "cloudinary";
// import { ConfigService } from '@nestjs/config';
// const configService = new ConfigService();

// const cloudName = configService.get<string>('CLOUD_NAME');
// const apiKey = configService.get<string>('CLOUDINARY_API_KEY');
// const apiSecret = configService.get<string>('CLOUDINARY_API_SECRET');

// console.log('Cloud Name:', cloudName);
// console.log('API Key:', apiKey);
// console.log('API Secret:', apiSecret);

// export const CloudinaryProvider = {
//     provide: "CLOUDINARY",
//     useFactory: async (configService: ConfigService) => {
//         return v2.config({
// cloud_name: configService.get<string>('CLOUD_NAME'),
// api_key: configService.get<string>('CLOUDINARY_API_KEY'),
// api_secret: configService.get<string>('CLOUDINARY_API_SECRET'),
//         });
//     }
// };