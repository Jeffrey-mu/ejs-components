interface Config {
  siteName: string;
}
export const appConfig: Config = {
  siteName: "Ejs Components",
};

export const header = {
  Authorization: "113Bmongojsdalkfnxcvmas",
};
export const api = process.env.NODE_ENV !== 'development' ? 'http://47.104.212.164:3000/' : '/api'
