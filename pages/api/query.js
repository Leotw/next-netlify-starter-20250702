import { runCommands } from './util';

export default async function handler(req, res) {
  const commandRet = await runCommands(req.body.command);
  const textRet = commandRet.join("\n");
  const result = textRet.split('\n').filter(e => e);
  return res.json(result);
}
