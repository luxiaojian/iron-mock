class Util {
  static commonError(e) {
    swal({
      title: '出错了!',
      text: e.data.message,
      type: 'error',
      confirmButtonText: '知道了!'
    });
  }
}

export default Util;
