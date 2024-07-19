import { environment } from "../environments/environment";

export const endpoints = {
    word_endpoint: environment.dictionary_api_endpoint + "/%word",
}