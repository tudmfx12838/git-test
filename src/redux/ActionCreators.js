import * as ActionTypes from "./ActionTypes";
import { baseUrl } from "../shared/baseUrl";

export const deleteStaff = (staffId) => ({
  type: ActionTypes.DELETE_STAFF,
  payload: staffId,
});

export const fetchDeleteStaff = (staffId) => (dispatch) => {
  // alert(staffId);
  fetch("https://rjs101xbackend.herokuapp.com/staffs/" + staffId, {
    method: "DELETE",
  })
    .then((res) => res.json()) // or res.json()
    .then((res) => {
      dispatch(deleteStaff(res));
    });
  // .then(res => console.log(res))
};

export const putStaff =
  (
    staffId,
    name,
    doB,
    salaryScale,
    startDate,
    departmentId,
    annualLeave,
    overTime,
    image,
    salary
  ) =>
  (dispatch) => {
    const updateStaff = {
      id: staffId,
      name: name,
      doB: doB,
      salaryScale: salaryScale,
      startDate: startDate,
      departmentId: departmentId,
      annualLeave: annualLeave,
      overTime: overTime,
      image: image,
      salary: salary,
    };
    // alert(JSON.stringify(updateStaff) + '  ' + staffId);
    // console.log(baseUrl + 'staffs/' + staffId);
    // return fetch(`${baseUrl}staffs/${staffId}.json`, {
    return fetch(baseUrl + "staffs/", {
      method: "PATCH",
      body: JSON.stringify(updateStaff),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "same-origin",
    })
      .then(
        (respone) => {
          if (respone.ok) {
            return respone;
          } else {
            var error = new Error(
              "Error" + respone.status + " : " + respone.statusText
            );
            error.respone = respone;
            throw error;
          }
        },
        (error) => {
          var errmess = new Error(error.message);
          throw errmess;
        }
      )
      .then((respone) => respone.json())
      .then((staff) => dispatch(updateStaff_info(staff)))
      .catch((error) => {
        console.log("put staff", error.message);
        alert("Your staff could not be putted\nError: " + error.message);
      });
  };

export const updateStaff_info = (staff) => ({
  type: ActionTypes.UPDATE_STAFF,
  payload: staff,
});

export const postStaff =
  (
    name,
    doB,
    salaryScale,
    startDate,
    departmentId,
    annualLeave,
    overTime,
    image,
    salary
  ) =>
  (dispatch) => {
    const newStaff = {
      name: name,
      doB: doB,
      salaryScale: salaryScale,
      startDate: startDate,
      departmentId: departmentId,
      annualLeave: annualLeave,
      overTime: overTime,
      image: image,
      salary: salary,
    };

    return fetch(baseUrl + "staffs", {
      method: "POST",
      body: JSON.stringify(newStaff),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "same-origin",
    })
      .then(
        (respone) => {
          if (respone.ok) {
            return respone;
          } else {
            var error = new Error(
              "Error" + respone.status + " : " + respone.statusText
            );
            error.respone = respone;
            throw error;
          }
        },
        (error) => {
          var errmess = new Error(error.message);
          throw errmess;
        }
      )
      .then((respone) => respone.json())
      .then((staff) => dispatch(addStaff(staff)))
      .catch((error) => {
        console.log("post staff", error.message);
        alert("Your staff could not be posted\nError: " + error.message);
      });
  };

export const addStaff = (staff) => ({
  type: ActionTypes.ADD_STAFF,
  payload: staff,
});

export const fetchStaffs = () => (dispatch) => {
  dispatch(staffsLoading(true));

  return fetch(baseUrl + "staffs")
    .then(
      (respone) => {
        if (respone.ok) {
          return respone;
        } else {
          var error = new Error(
            "Error" + respone.status + " : " + respone.statusText
          );
          error.respone = respone;
          throw error;
        }
      },
      (error) => {
        var errmess = new Error(error.message);
        throw errmess;
      }
    )

    .then((respone) => respone.json())
    .then((staffs) => dispatch(addStaffs(staffs)))
    .catch((error) => dispatch(staffsFailed(error.message)));
};

export const staffsLoading = (bol) => ({
  type: ActionTypes.STAFFS_LOADING,
  payload: bol,
});

export const staffsFailed = (errmess) => ({
  type: ActionTypes.STAFFS_FAILED,
  payload: errmess,
});

export const addStaffs = (staffs) => ({
  type: ActionTypes.ADD_STAFFS,
  payload: staffs,
});

export const fetchDepartments = () => (dispatch) => {
  dispatch(departmentsLoading(true));

  return fetch(baseUrl + "departments")
    .then(
      (respone) => {
        if (respone.ok) {
          return respone;
        } else {
          var error = new Error(
            "Error" + respone.status + " : " + respone.statusText
          );
          error.respone = respone;
          throw error;
        }
      },
      (error) => {
        var errmess = new Error(error.message);
        throw errmess;
      }
    )

    .then((respone) => respone.json())
    .then((departments) => dispatch(addDepartments(departments)))
    .catch((error) => dispatch(departmentsFailed(error.message)));
};

export const departmentsLoading = (bol) => ({
  type: ActionTypes.DEPARTMENTS_LOADING,
  payload: bol,
});

export const departmentsFailed = (errmess) => ({
  type: ActionTypes.DEPARTMENTS_FAILED,
  payload: errmess,
});

export const addDepartments = (departments) => ({
  type: ActionTypes.ADD_DEPARTMENTS,
  payload: departments,
});

export const fetchStaffsSalary = () => (dispatch) => {
  dispatch(staffsSalaryLoading(true));

  return fetch(baseUrl + "staffsSalary")
    .then(
      (respone) => {
        if (respone.ok) {
          return respone;
        } else {
          var error = new Error(
            "Error" + respone.status + " : " + respone.statusText
          );
          error.respone = respone;
          throw error;
        }
      },
      (error) => {
        var errmess = new Error(error.message);
        throw errmess;
      }
    )

    .then((respone) => respone.json())
    .then((staffsSalary) => dispatch(addstaffsSalary(staffsSalary)))
    .catch((error) => dispatch(staffsSalaryFailed(error.message)));
};

export const staffsSalaryLoading = (bol) => ({
  type: ActionTypes.STAFFSSALARY_LOADING,
  payload: bol,
});

export const staffsSalaryFailed = (errmess) => ({
  type: ActionTypes.STAFFSSALARY_FAILED,
  payload: errmess,
});

export const addstaffsSalary = (staffsSalary) => ({
  type: ActionTypes.ADD_STAFFSSALARY,
  payload: staffsSalary,
});
