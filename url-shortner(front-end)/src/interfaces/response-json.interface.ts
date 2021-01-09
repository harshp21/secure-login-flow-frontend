import { UrlDetails } from './url-details.interface';
interface ResponseJson {
    message: string,
    data?: Array<UrlDetails> | UrlDetails;
}

export { ResponseJson };