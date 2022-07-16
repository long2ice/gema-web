const defaultValues: Record<string, string> = {
  json: `{
  "author": "long2ice",
  "repo": "https://github.com/long2ice/gema-web",
  "email": "long2ice@gmail.com"
}`,
  xml: `<?xml version="1.0" encoding="UTF-8" ?>
<info>
  <author>long2ice</author>
  <repo>https://github.com/long2ice/gema-web</repo>
  <email>long2ice@gmail.com</email>
</info>`,
  yaml: `author: long2ice
repo: https://github.com/long2ice/gema-web
email: long2ice@gmail.com`,
  toml: `[info]
author = "long2ice"
email = "long2ice@gmail.com"
repo = "https://github.com/long2ice/gema-web"`,
};

export default defaultValues;
