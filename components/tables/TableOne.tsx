import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { headers } from "next/headers";
const productData = [
  {
    date: "hello",
    PunchedIn: "Apple Watch 7",
    inGeolocation: "Electronics",
    punchedOut: 296,
    outGeolocation: 22,
    behaviour: 45,
    type: "Auto",
    breakTIme: 0,
    totalHours: 19,
    entry: "single",
  },
  {
    date: "",
    PunchedIn: "Macbook Pro",
    inGeolocation: "Electronics",
    punchedOut: 546,
    outGeolocation: 12,
    behaviour: 125,
    type: "Auto",
    breakTIme: 0,
    totalHours: 19,
    entry: "single",
  },
  {
    date: "",
    PunchedIn: " Inspiron 15",
    inGeolocation: "Electronics",
    punchedOut: 443,
    outGeolocation: 64,
    behaviour: 247,
    type: "Auto",
    breakTIme: 0,
    totalHours: 19,
    entry: "single",
  },
  {
    date: "",
    PunchedIn: "Probook 450",
    inGeolocation: "Electronics",
    punchedOut: 499,
    outGeolocation: 72,
    behaviour: 103,
    type: "Auto",
    breakTIme: 0,
    totalHours: 19,
    entry: "single",
  },
];

const getGridColsClass = (cols: number) => {
  switch (cols) {
    case 1:
      return "grid-cols-1";
    case 2:
      return "grid-cols-2";
    case 3:
      return "grid-cols-3";
    case 4:
      return "grid-cols-4";
    case 5:
      return "grid-cols-5";
    case 6:
      return "grid-cols-6";
    case 7:
      return "grid-cols-7";
    case 8:
      return "grid-cols-8";
    case 9:
      return "grid-cols-9";
    case 10:
      return "grid-cols-10";
    default:
      return "grid-cols-1"; // fallback to 1 column if not specified
  }
};
const TableOne = ({ cols, headers }: { cols: number; headers: string[] }) => {
  const gridsnum = getGridColsClass(cols);
  return (
    <div className="rounded-sm   border-stroke bg-white  dark:border-strokedark dark:bg-boxdark">
      <div
        className={`grid text-sm ${gridsnum} border-b border-stroke py-4.5 px-4 dark:border-strokedark  sm:${gridsnum} md:px-6 2xl:px-5`}
      >
        {headers.map((item) => (
          <div key={item} className="col-span-1 flexitems-center">
            <p className="font-medium ">{item}</p>
          </div>
        ))}
      </div>

      {productData.map((product, key) => (
        <div
          className="grid grid-cols-10 border-b border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-10 md:px-6 2xl:px-7.5"
          key={key}
        >
          <div className="col-span-1 flex items-center">
            <div className="flex flex-col  gap-4 sm:flex-row sm:items-center">
              <p className="text-sm text-black dark:text-white">
                {product.date}
              </p>
            </div>
          </div>
          <div className="col-span-1 flex items-center">
            <div className="flex flex-col  gap-4 sm:flex-row sm:items-center">
              <p className="text-sm text-black dark:text-white">
                {product.PunchedIn}
              </p>
            </div>
          </div>
          <div className="col-span-1 hidden items-center sm:flex">
            <p className="text-sm text-black dark:text-white">
              {product.inGeolocation}
            </p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-sm text-black dark:text-white">
              ${product.punchedOut}
            </p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-sm text-black dark:text-white">
              {product.outGeolocation}
            </p>
          </div>
          <div className="col-span-1 flex items-center ">
            <p className="text-sm bg-meta-3 text-white py-2 px-3 rounded-full">
              {product.behaviour}
            </p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-sm ">{product.type}</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-sm ">{product.breakTIme}</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-sm ">{product.totalHours}</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-sm bg-meta-3 py-1 px-4 rounded-full capitalize text-white">
              {product.entry}
            </p>
          </div>
        </div>
      ))}
      <div className="flex items-center justify-between border-b border-gray-200 bg-white px-4 py-5 sm:px-6">
        <div className="flex flex-1 justify-between sm:hidden">
          <a
            href="#"
            className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Previous
          </a>
          <a
            href="#"
            className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Next
          </a>
        </div>
        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              Showing <span className="font-medium">1</span> to{" "}
              <span className="font-medium">10</span> of{" "}
              <span className="font-medium">97</span> results
            </p>
          </div>
          <div>
            <nav
              aria-label="Pagination"
              className="isolate inline-flex -space-x-px rounded-md shadow-sm"
            >
              <a
                href="#"
                className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              >
                <span className="sr-only">Previous</span>
                <ChevronLeftIcon aria-hidden="true" className="h-5 w-5" />
              </a>
              {/* Current: "z-10 bg-blue-500 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}
              <a
                href="#"
                aria-current="page"
                className="relative z-10 inline-flex items-center bg-blue-500 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
              >
                1
              </a>
              <a
                href="#"
                className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              >
                2
              </a>
              <a
                href="#"
                className="relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex"
              >
                3
              </a>
              <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0">
                ...
              </span>
              <a
                href="#"
                className="relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex"
              >
                8
              </a>
              <a
                href="#"
                className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              >
                9
              </a>
              <a
                href="#"
                className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              >
                10
              </a>
              <a
                href="#"
                className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              >
                <span className="sr-only">Next</span>
                <ChevronRightIcon aria-hidden="true" className="h-5 w-5" />
              </a>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableOne;
