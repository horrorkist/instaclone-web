import { gql } from "@apollo/client";

export const UPLOAD_URL_QUERY = gql`
  query uploadUrl {
    getUploadUrl
  }
`;

export const UPLOAD_POST_MUTATION = gql`
  mutation uploadPhoto($url: String!, $caption: String) {
    uploadPhoto(url: $url, caption: $caption) {
      ok
      error
    }
  }
`;
