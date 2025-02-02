export interface YouTubeContent {
    videoId: string;
    isShort: boolean;
    thumbnailUrl: string;
    tags: string[];
}

export interface YouTubeData {
    query: string;
    tags: string[];
    contents: YouTubeContent[];
}

export interface SearchResult {
    youtube: YouTubeData;
}

export interface Call {
    callId: string;
    name?: string;
    callEndTime: string; // YYYY-MM-DD HH:mm:SS
    callStartTime: string;
    pushBody: string;
    searchResult: SearchResult[];
}

// Define the type for the main data structure
export interface CallList {
    callList: Call[];
}
