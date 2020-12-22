class Logger {
  log = [];

  add(line) {
    this.log.push(line);
  }

  get() {
    return this.log;
  }

  reset() {
    this.log = [];
  }
}

export default Logger;
