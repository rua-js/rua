
const Instance = (...args: any[]) => (_class: any) => {
  return new _class(...args)
}

export default Instance