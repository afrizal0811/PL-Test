import swal from "sweetalert2";

const NotifyError = (title, message) => {
  return swal.fire({
    icon: "error",
    title: title,
    text: message,
  });
};

const NotifySuccess = (title, message) => {
  return swal.fire({
    icon: "success",
    title: title,
    text: message,
  });
};

const NotifyQuestion = (title, message) => {
  return swal.fire({
    icon: "question",
    title: title,
    text: message,
  });
};

const NotifyConfirm = (title, message, btnPositive, btnCancel, onPress) => {
  return swal
    .fire({
      title: title,
      text: message,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: btnPositive,
      confirmButtonColor: "blue",
      cancelButtonText: btnCancel,
      cancelButtonColor: "red",
      reverseButtons: true,
    })
    .then((result) => {
      if (result.isConfirmed) {
        onPress();
      }
    });
};

const NotifyWarning = (title, message) => {
  return swal.fire({
    icon: "warning",
    title: title,
    text: message,
  });
};

export {
  NotifyError,
  NotifySuccess,
  NotifyQuestion,
  NotifyWarning,
  NotifyConfirm,
};
