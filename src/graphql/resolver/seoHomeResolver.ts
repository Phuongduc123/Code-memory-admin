export const seoHomeResolver = `
  createBy
  description
  domain
  facebookChatPlugin
  history {
    key
    oldValue
    newValue
  }
  id
  image {
    logoAlt
    logoAltEN
    logo1280x720
    logo800x600
    faviconUrlJPG
    faviconUrlICO
    logo400x400
  }
  searchBoxUrl
  siteName
  social {
    youtubeUrl
    twitterUrl
    facebookAppId
    facebookPageUrl
  }
  title
  createdAt
  reason
  descriptionEN
  titleEN
`;

export const RS_SEO_HOME = {
  seoHomeCreate: "seoHomeCreate",
  getSeoHome: "seoHome",
  seoHomeEntire: "seoHomeEntire"
};