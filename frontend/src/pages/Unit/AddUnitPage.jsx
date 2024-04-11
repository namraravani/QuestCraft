import React from "react";
import DefaultLayout from "../../layout/DefaultLayout";
import Breadcrumb from "../../components/BreadCrumb/BreadCrumb";

import DynamicDropDown from "../../components/Forms/DynamicDropDown";

const AddUnitPage = () => {
  const optionlist = ["Active", "InActive"];
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Add Unit" />
      <div className="grid grid-cols-1 gap-9 sm:grid-cols-1 p-15">
        <div className="flex flex-col gap-9">
          {/* <!-- Create Subject Paper Form --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Add Unit
              </h3>
            </div>
            <form action="#">
              <div className="p-6.5 flex flex-col">
                <div className="w-full">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Unit Name :-
                  </label>
                  <input
                    type="text"
                    placeholder="eg Machine Learning"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
                <div className="w-full">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Subject Code
                  </label>
                  <input
                    type="text"
                    placeholder="eg 01AICT"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                </div>
                <div className="w-full">
                  <DynamicDropDown
                    Title={"Select Status"}
                    optionlist={optionlist}
                  />
                </div>
                <button className="flex flex-row items-center w-1/2 justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90">
                  Confirm
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default AddUnitPage;
