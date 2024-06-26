import DefaultLayout from "../../layout/DefaultLayout";

import Breadcrumb from "../../components/BreadCrumb/BreadCrumb";
import * as yup from "yup";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DynamicDropDown from "../../components/Forms/DynamicDropDown";
import { useFormik } from "formik";
import ReactQill from "react-quill";
import { useState } from "react";
import "react-quill/dist/quill.snow.css";
import SelectSwitch from "../../components/Forms/SelectSwitch";
import { useNavigate } from "react-router-dom";
import { dataMap } from "./paperData";

const SubjectPaper = () => {
  const navigate = useNavigate();

  const [paperType, setPaperType] = useState(false);

  const toolbarOptions = [
    ["bold", "italic", "underline", "strike"],
    ["blockquote", "code-block"],
    ["link", "image", "video", "formula"],

    [{ header: 1 }, { header: 2 }],
    [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
    [{ script: "sub" }, { script: "super" }],
    [{ indent: "-1" }, { indent: "+1" }],
    [{ direction: "rtl" }],

    [{ size: ["small", false, "large", "huge"] }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],

    [{ color: [] }, { background: [] }],
    [{ font: [] }],
    [{ align: [] }],

    ["clean"],
  ];
  const module = {
    toolbar: toolbarOptions,
  };

  const semesterList = [1, 2, 3, 4, 5, 6, 7, 8];
  const branchList = ["Faculty of Technology", "Faculty of Management"];
  const departmentList = [
    "Information & Communication Technology",
    "Computer Science",
  ];
  const statusList = ["Active", "Disable"];
  const subjectList = ["Machine Learning", "Compuer Network"];

  const validationSchema = yup.object({
    paperdate: yup
      .date()
      .required("Paper Date is required")
      .min(new Date(), "Paper Date should be today or later"),
    timeAllowance: yup
      .string()
      .required("Time Allowance is required")
      
    // Ensure paper date is not before today
  });

  const formik = useFormik({
    initialValues: {
      branchName: branchList[0],
      departmentList: departmentList[0],
      semesterList: semesterList[0],
      paperdate: "",
      timeAllowance: "",
      subject: subjectList[0],
      status: statusList[0],
      totalMarks: "30",
      paperType: false,
      enableTranslation: true,
      paperDescription: "",
    },
    validationSchema,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  const handleSubmit = async (values) => {
    values.paperType = values.paperType ? "final-sem-exam" : "mid-sem-exam";
    values.enableTranslation = values.enableTranslation ? "yes" : "no";

    dataMap.header = values;

    toast.success("Header submitted successfully", {
      position: "bottom-right",
      hideProgressBar: true,
    });

    values.paperType === "mid-sem-exam"
      ? setTimeout(() => {
          navigate("/qpaper/set-subject-paper/select-question-for-section-a");
        }, 1000)
      : setTimeout(() => {
          navigate(
            "/qpaper/set-subject-paper/select-question-for-section-a-final"
          );
        }, 1000);
  };

  const updateTotalMarks = () => {
    const totalMarks = paperType ? 30 : 100; // Set total marks based on switch state
    formik.setFieldValue("totalMarks", totalMarks);
  };

  const handleSetPaperType = (value) => {
    setPaperType(value);
    updateTotalMarks(); // Call updateTotalMarks whenever paperType changes
  };

  return (
    <DefaultLayout>
      <ToastContainer position="bottom-right" />
      <Breadcrumb pageName="Set Subject Paper" />
      <div className="flex justify-center">
        <div className="relative h-2.5 w-full xl:w-3/4 rounded-full bg-stroke dark:bg-strokedark m-10">
          {/* Adjusted positioning for the parent container */}
          <div className="absolute  h-full w-full xl:w-3/4 rounded-full bg-stroke dark:bg-strokedark">
            <div className="absolute  h-full w-1 rounded-full bg-primary">
              {/* Adjusted positioning for the pointer */}
              <span className="absolute bottom-full -right-0.5 transform translate-x-1/2 z-10 mb-2 inline-block rounded-sm bg-primary px-2 py-1 text-xs font-bold text-white">
                {/* Adjusted positioning for the triangle */}
                <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 -z-1 h-2 w-2 rotate-45 bg-primary"></span>
                Header
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-9 sm:grid-cols-1">
        <div className="flex flex-col gap-9">
          {/* <!-- Create Subject Paper Form --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Create Question Paper
              </h3>
            </div>
            <form onSubmit={formik.handleSubmit}>
              <div className="p-6.5">
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <DynamicDropDown
                      name="branchName"
                      title={"Select Branch"}
                      value={formik.values.branchName}
                      optionlist={branchList}
                      onChange={(e) => {
                        formik.setFieldValue("branchName", e.target.value);
                      }}
                      onBlur={formik.handleBlur}
                    />
                  </div>

                  <div className="w-full xl:w-1/2">
                    <DynamicDropDown
                      name="departmentName"
                      title={"Select Department"}
                      value={formik.values.departmentName}
                      optionlist={departmentList}
                      onChange={(e) => {
                        formik.setFieldValue("departmentName", e.target.value);
                      }}
                      onBlur={formik.handleBlur}
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-4  xl:flex-row mt-5">
                  <div className="w-full xl:w-1/2">
                    <DynamicDropDown
                      name="semester"
                      title={"Select semester"}
                      value={formik.values.semesterList}
                      optionlist={semesterList}
                      onChange={(e) => {
                        formik.setFieldValue("departmentName", e.target.value);
                      }}
                      onBlur={formik.handleBlur}
                    />
                  </div>
                  <div className="w-full xl:w-1/2">
                    <label className="labelfield">
                      Paper Date
                      <div className="relative">
                        <input
                          type="date"
                          name="paperdate"
                          value={formik.values.paperdate}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          className="inputfield"
                        />
                      </div>
                      {formik.touched.paperdate && formik.errors.paperdate ? (
                        <div className="error">{formik.errors.paperdate}</div>
                      ) : null}
                    </label>
                  </div>
                </div>

                <div className=" flex flex-col gap-4  xl:flex-row mt-5">
                  <div className="w-full xl:w-1/2">
                    <label className="labelfield">
                      Time Allowance
                      <div className="relative">
                        <input
                          type="text"
                          name="timeAllowance"
                          value={formik.values.timeAllowance}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          className="inputfield"
                        />
                      </div>
                      {formik.touched.timeAllowance &&
                      formik.errors.timeAllowance ? (
                        <div className="error">
                          {formik.errors.timeAllowance}
                        </div>
                      ) : null}
                    </label>
                  </div>
                  <div className="w-full xl:w-1/2">
                    <DynamicDropDown
                      name="subject"
                      title={"Select Subject"}
                      value={formik.values.subjectList}
                      optionlist={subjectList}
                      onChange={(e) => {
                        formik.setFieldValue("departmentName", e.target.value);
                      }}
                      onBlur={formik.handleBlur}
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-4  xl:flex-row mt-5">
                  <div className="w-full xl:w-1/2">
                    <DynamicDropDown
                      name="status"
                      title={"Status"}
                      value={formik.values.statusList}
                      optionlist={statusList}
                      onChange={(e) => {
                        formik.setFieldValue("departmentName", e.target.value);
                      }}
                      onBlur={formik.handleBlur}
                    />
                  </div>
                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Total Marks
                    </label>
                    <input
                      type="text"
                      value={formik.values.totalMarks}
                      placeholder="Total Marks Will Be Displayed Here"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                      disabled
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-30 justify-start  xl:flex-row mt-5">
                  <div className="flex flex-row items-center">
                    <label className="w-40 text-black dark:text-white">
                      Paper type :-
                    </label>
                    <SelectSwitch
                      enabled={formik.values.paperType}
                      setEnabled={(value) => {
                        formik.setFieldValue("paperType", value);
                        handleSetPaperType(value);
                      }}
                      option1={"Mid sem exam"}
                      option2={"Final sem exam"}
                      id="paper-type-switch"
                    />
                  </div>
                  <div className="flex flex-row items-center">
                    <label className="w-60 text-black dark:text-white">
                      Translate paper in gujarati :-
                    </label>
                    <SelectSwitch
                      enabled={formik.values.enableTranslation}
                      setEnabled={(value) => {
                        formik.setFieldValue("enableTranslation", value);
                      }}
                      option1={"yes"}
                      option2={"no"}
                      id="translation-switch"
                    />
                  </div>
                </div>

                <label className="mb-4 mt-8 block text-black dark:text-white">
                  Question Paper Description
                </label>
                <ReactQill
                  className="h-50 mb-30"
                  modules={module}
                  theme="snow"
                  value={formik.values.paperDescription}
                  onChange={(content, delta, source, editor) => {
                    const value = editor.getContents(); // Get the updated content
                    formik.setFieldValue("paperDescription", value);
                  }}
                />

                <div className="flex justify-center mt-4.5">
                  {" "}
                  <button
                    type="submit"
                    disabled={!formik.isValid}
                    className="flex flex-row items-center self-center justify-center w-1/2 rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default SubjectPaper;
