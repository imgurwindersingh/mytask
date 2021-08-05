export function dumpLog(message: any, arg?: any) {
  console.log(message, arg == undefined ? '' : arg);
}

export function begin(arg?: any) {
  console.log('BEGIN**********************', arg);
}

export function dumpAPI(arg?: any) {
  console.debug('API : ', arg);
}

export function end(arg?: any) {
  console.log(arg, '************************END');
}

export function dumpRequest(apiName:string, arg: any) {
  console.debug('REQUESTING TO : ', apiName , arg);
}

export function dumpResponse(arg: any) {
  console.debug('RESPONSE FROM : ', arg);
}

export function dumpError(arg?: any) {
  console.error('ERROR : ', arg);
}

export function dumpSingletonInstanceUpdation(data: any, updatedIn: string) {
  console.log('SINGLETON INSTANCE : ', data, ' updatedIn : ', updatedIn);
}
