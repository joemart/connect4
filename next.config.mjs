import path, {dirname} from "path"
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)


/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: false,
  webpack(config){
    config.module.rules.push({
      test: /\.svg$/,
      // use: [{loader:"@svgr/webpack", options: {icon:true}}]
      use: ["@svgr/webpack"]
    })
    return config;
  },
  sassOptions:{
    includePaths: [path.join(__dirname,"src/styles")]
  },
  // skipMiddlewareUrlNormalize:true
};

export default nextConfig;
