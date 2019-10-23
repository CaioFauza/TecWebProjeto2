export const getAccessToken = value => ({
    type: 'CREDENTIALS',
    accessToken: value
});

export const getRefreshToken = value => ({
    type: 'CREDENTIALSR',
    refreshToken: value
});

export const getModalImage = value => ({
    type: 'MODALIMAGE',
    modalImage: value
});

export const getModalUrl = value => ({
    type: 'MODALURL',
    modalUrl: value
});

export const getModalArtist = value => ({
    type: 'MODALARTIST',
    modalArtist: value
});

export const getModalMusic = value => ({
    type: 'MODALMUSIC',
    modalMusic: value
});