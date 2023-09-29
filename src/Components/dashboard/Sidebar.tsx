"use client";
import { usePathname } from "next/navigation";
import React from "react";

function Sidebar() {
  const router = usePathname();
  return (
    <div className="fixed top-16 left-3 rounded-xl bg-none flex flex-col border-[#2D2F39] border justify-between h-[calc(100vh-5rem)] w-11 ">
      <div className="w-full h-10 rounded-[0.75rem_0.75rem_0px_0px] bg-slate-500"></div>
      <div className="h-[calc(100%-5rem)] flex flex-col items-center pt-3">
        <svg
          width={33}
          height={30}
          className={
            router === "/dashboard"
              ? "bg-[#2D2F39] rounded"
              : "bg-none hover:bg-[#383b46] duration-150 rounded"
          }
          viewBox="0 0 44 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M22 12.2314C21.2386 12.2314 20.4917 12.4401 19.8406 12.8347L15.6739 15.3597C15.0612 15.731 14.5546 16.254 14.2029 16.8782C13.8513 17.5024 13.6666 18.2067 13.6666 18.9232V24.1665C13.6666 25.2716 14.1056 26.3314 14.887 27.1128C15.6684 27.8942 16.7282 28.3332 17.8333 28.3332H26.1666C27.2717 28.3332 28.3315 27.8942 29.1129 27.1128C29.8943 26.3314 30.3333 25.2716 30.3333 24.1665V18.9223C30.3331 18.2061 30.1483 17.5018 29.7967 16.8777C29.4451 16.2537 28.9386 15.7309 28.326 15.3597L24.1593 12.8347C23.5082 12.4401 22.7613 12.2314 22 12.2314ZM20.7043 14.26C21.095 14.0233 21.5431 13.8981 22 13.8981C22.4568 13.8981 22.9049 14.0233 23.2956 14.26L27.4622 16.785C27.8298 17.0078 28.1337 17.3215 28.3447 17.6959C28.5556 18.0702 28.6665 18.4927 28.6666 18.9223V24.1665C28.6666 24.8296 28.4032 25.4654 27.9344 25.9343C27.4655 26.4031 26.8297 26.6665 26.1666 26.6665H25.3333V24.1665C25.3333 23.2825 24.9821 22.4346 24.357 21.8095C23.7319 21.1844 22.884 20.8332 22 20.8332C21.1159 20.8332 20.2681 21.1844 19.6429 21.8095C19.0178 22.4346 18.6666 23.2825 18.6666 24.1665V26.6665H17.8333C17.1703 26.6665 16.5344 26.4031 16.0655 25.9343C15.5967 25.4654 15.3333 24.8296 15.3333 24.1665V18.9232C15.3333 18.4933 15.4441 18.0707 15.6551 17.6962C15.8661 17.3216 16.17 17.0078 16.5377 16.785L20.7043 14.26ZM23.1785 22.988C23.491 23.3006 23.6666 23.7245 23.6666 24.1665V26.6665H20.3333V24.1665C20.3333 23.7245 20.5089 23.3006 20.8214 22.988C21.134 22.6754 21.5579 22.4999 22 22.4999C22.442 22.4999 22.8659 22.6754 23.1785 22.988Z"
            fill="#757575"
          />
        </svg>
        <svg
          style={{ color: "rgb(117, 117, 117)" }}
          className={router==="/matchs" ? "bg-[#2D2F39] rounded":"bg-none hover:bg-[#383b46] duration-150 rounded"}
          xmlns="http://www.w3.org/2000/svg"
          width={33}
          height={30}
          fill="currentColor"
          viewBox="0 -4 16 25"
        >
          {" "}
          <path
            d="M10.804 8 5 4.633v6.734L10.804 8zm.792-.696a.802.802 0 0 1 0 1.392l-6.363 3.692C4.713 12.69 4 12.345 4 11.692V4.308c0-.653.713-.998 1.233-.696l6.363 3.692z"
            fill="#757575"
          />{" "}
        </svg>
        <svg
          width={33}
          height={30}
          className={
            router === "/scheludes"
              ? "bg-[#2D2F39] rounded"
              : "bg-none hover:bg-[#383b46] rounded"
          }
          viewBox="0 0 44 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M18.6667 11.6667C18.6667 11.2065 18.2936 10.8334 17.8333 10.8334C17.3731 10.8334 17 11.2065 17 11.6667V12.5H16.1667C15.5036 12.5 14.8677 12.7634 14.3989 13.2323C13.93 13.7011 13.6667 14.337 13.6667 15V25.8334C13.6667 26.4964 13.93 27.1323 14.3989 27.6011C14.8677 28.07 15.5036 28.3334 16.1667 28.3334H27.8333C28.4964 28.3334 29.1322 28.07 29.6011 27.6011C30.0699 27.1323 30.3333 26.4964 30.3333 25.8334V15C30.3333 14.337 30.0699 13.7011 29.6011 13.2323C29.1322 12.7634 28.4964 12.5 27.8333 12.5H27.4167C26.9564 12.5 26.5833 12.8731 26.5833 13.3334C26.5833 13.7936 26.9564 14.1667 27.4167 14.1667H27.8333C28.0543 14.1667 28.2663 14.2545 28.4226 14.4108C28.5789 14.5671 28.6667 14.779 28.6667 15V17.5H15.3333V15C15.3333 14.779 15.4211 14.5671 15.5774 14.4108C15.7337 14.2545 15.9456 14.1667 16.1667 14.1667H17V15C17 15.4603 17.3731 15.8334 17.8333 15.8334C18.2936 15.8334 18.6667 15.4603 18.6667 15V11.6667ZM15.5774 26.4226C15.4211 26.2663 15.3333 26.0544 15.3333 25.8334V19.1667H28.6667V25.8334C28.6667 26.0544 28.5789 26.2663 28.4226 26.4226C28.2663 26.5789 28.0543 26.6667 27.8333 26.6667H16.1667C15.9456 26.6667 15.7337 26.5789 15.5774 26.4226Z"
            fill="#5F5F5F"
          />
          <path
            d="M25.3333 11.6667C25.3333 11.2065 24.9602 10.8334 24.5 10.8334C24.0398 10.8334 23.6667 11.2065 23.6667 11.6667V12.5H20.75C20.2898 12.5 19.9167 12.8731 19.9167 13.3334C19.9167 13.7936 20.2898 14.1667 20.75 14.1667H23.6667V15C23.6667 15.4603 24.0398 15.8334 24.5 15.8334C24.9602 15.8334 25.3333 15.4603 25.3333 15V11.6667Z"
            fill="#5F5F5F"
          />
        </svg>

        <svg
          width={33}
          height={30}
          className={
            router === "/rank"
              ? "bg-[#2D2F39] rounded"
              : "bg-none hover:bg-[#383b46] duration-150 rounded"
          }
          viewBox="0 0 44 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M25 11.6666C24.6464 11.6666 24.3072 11.8071 24.0572 12.0572C23.8071 12.3072 23.6667 12.6463 23.6667 13V16.6666H20C19.6464 16.6666 19.3072 16.8071 19.0572 17.0571C18.8071 17.3072 18.6667 17.6463 18.6667 18V22.5H15C14.6464 22.5 14.3072 22.6404 14.0572 22.8905C13.8071 23.1405 13.6667 23.4797 13.6667 23.8333V27C13.6667 27.3536 13.8071 27.6927 14.0572 27.9428C14.3072 28.1928 14.6464 28.3333 15 28.3333H29C29.3536 28.3333 29.6927 28.1928 29.9428 27.9428C30.1928 27.6927 30.3333 27.3536 30.3333 27V13C30.3333 12.6463 30.1928 12.3072 29.9428 12.0572C29.6927 11.8071 29.3536 11.6666 29 11.6666H25ZM20.3333 18.3333H23.6667V26.6666H20.3333V18.3333ZM28.6667 26.6666H25.3333V13.3333H28.6667V26.6666ZM18.6667 24.1666V26.6666H15.3333V24.1666H18.6667Z"
            fill="#757575"
          />
        </svg>
        <h5 className="text-[7px] mt-3">SETTINGS</h5>
        <svg
          width={33}
          height={30}
          className={
            router === "/notification"
              ? "bg-[#2D2F39] rounded"
              : "bg-none hover:bg-[#383b46] duration-150 rounded"
          }
          viewBox="0 0 44 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M21.9984 10.8325C20.4336 10.8325 18.9445 11.496 17.8547 12.6584C16.7673 13.8182 16.1651 15.3808 16.1651 16.9992C16.1651 19.9962 15.5638 21.8633 15.0065 22.9532C14.727 23.4997 14.4549 23.8582 14.266 24.0708C14.1714 24.1774 14.097 24.248 14.0523 24.2878C14.0299 24.3077 14.0148 24.3199 14.0083 24.3251L14.0059 24.327C13.7173 24.5384 13.5955 24.911 13.7046 25.2526C13.8149 25.5981 14.1358 25.8325 14.4984 25.8325H29.4984C29.861 25.8325 30.182 25.5981 30.2923 25.2526C30.4014 24.911 30.2796 24.5384 29.991 24.327L29.9885 24.3251C29.982 24.3199 29.967 24.3077 29.9446 24.2878C29.8999 24.248 29.8255 24.1774 29.7309 24.0708C29.542 23.8582 29.2699 23.4997 28.9904 22.9532C28.433 21.8633 27.8318 19.9962 27.8318 16.9992C27.8318 15.3808 27.2296 13.8182 26.1422 12.6584C25.0526 11.4972 23.5627 10.8325 21.9984 10.8325ZM14.0059 24.327L14.0083 24.3251L14.0059 24.327ZM14.0083 24.3251L14.0051 24.3276L14.0083 24.3251ZM27.5065 23.712C27.5897 23.8748 27.6733 24.0258 27.7563 24.1659H16.2406C16.3235 24.0258 16.4072 23.8748 16.4904 23.712C17.183 22.3576 17.8318 20.2246 17.8318 16.9992C17.8318 15.7892 18.2829 14.6385 19.0705 13.7983C19.8574 12.9591 20.9116 12.4992 21.9984 12.4992C23.0841 12.4992 24.1392 12.9596 24.9263 13.7983L26.2165 18.525C26.383 20.9153 26.9295 22.5837 27.5065 23.712ZM26.2165 18.525C26.1832 18.0461 26.1651 17.5376 26.1651 16.9992C26.1651 15.7894 25.7138 14.6384 24.9263 13.7983L26.2165 18.525Z"
            fill="#8A8C91"
          />
          <path
            d="M21.278 27.0817C21.0474 26.6834 20.5375 26.5474 20.1392 26.778C19.7409 27.0086 19.605 27.5184 19.8356 27.9167C20.0551 28.2959 20.3705 28.6108 20.7501 28.8296C21.1297 29.0485 21.5602 29.1637 21.9984 29.1637C22.4366 29.1637 22.8671 29.0485 23.2467 28.8296C23.6264 28.6108 23.9417 28.2959 24.1613 27.9167C24.3919 27.5184 24.2559 27.0086 23.8576 26.778C23.4593 26.5474 22.9495 26.6834 22.7189 27.0817C22.6458 27.208 22.5407 27.3129 22.4143 27.3858C22.2878 27.4587 22.1444 27.4971 21.9984 27.4971C21.8525 27.4971 21.7091 27.4587 21.5826 27.3858C21.4562 27.3129 21.3511 27.208 21.278 27.0817Z"
            fill="#8A8C91"
          />
        </svg>
        <svg
          width={33}
          height={30}
          className={
            router === "/settings"
              ? "bg-[#2D2F39] rounded"
              : "bg-none hover:bg-[#383b46] duration-150 rounded"
          }
          viewBox="0 0 44 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_3_174)">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M22 16.6666C21.116 16.6666 20.2681 17.0178 19.643 17.6429C19.0179 18.268 18.6667 19.1159 18.6667 19.9999C18.6667 20.884 19.0179 21.7318 19.643 22.3569C20.2681 22.9821 21.116 23.3333 22 23.3333C22.8841 23.3333 23.7319 22.9821 24.357 22.3569C24.9822 21.7318 25.3333 20.884 25.3333 19.9999C25.3333 19.1159 24.9822 18.268 24.357 17.6429C23.7319 17.0178 22.8841 16.6666 22 16.6666ZM20.8215 18.8214C21.1341 18.5088 21.558 18.3333 22 18.3333C22.442 18.3333 22.866 18.5088 23.1785 18.8214C23.4911 19.134 23.6667 19.5579 23.6667 19.9999C23.6667 20.4419 23.4911 20.8659 23.1785 21.1784C22.866 21.491 22.442 21.6666 22 21.6666C21.558 21.6666 21.1341 21.491 20.8215 21.1784C20.5089 20.8659 20.3333 20.4419 20.3333 19.9999C20.3333 19.5579 20.5089 19.134 20.8215 18.8214Z"
              fill="#757575"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M21.1508 10.8333C20.7723 10.8333 20.4413 11.0884 20.345 11.4545L19.9227 13.0588L18.581 13.6244L17.5539 12.7107C17.2242 12.4173 16.7229 12.4319 16.4108 12.744L14.7441 14.4107C14.4422 14.7126 14.4173 15.1939 14.6865 15.5253L15.5866 16.6335L15.0346 17.9915L13.4772 18.3551C13.1001 18.4431 12.8333 18.7793 12.8333 19.1666V20.8333C12.8333 21.209 13.0848 21.5383 13.4474 21.6372L15.0571 22.0763L15.6242 23.4217L14.7114 24.4453C14.4174 24.775 14.4317 25.2768 14.7441 25.5892L16.4108 27.2558C16.7131 27.5582 17.1952 27.5826 17.5265 27.3125L18.6344 26.4094L19.959 26.9542L20.3587 28.5373C20.4521 28.9073 20.785 29.1666 21.1667 29.1666H22.8333C23.2148 29.1666 23.5476 28.9075 23.6412 28.5377L24.042 26.954L25.4108 26.387C25.5486 26.5025 25.7066 26.6382 25.8638 26.7751C26.02 26.9111 26.1652 27.0393 26.2715 27.1336C26.3245 27.1806 26.3678 27.2192 26.3976 27.2458L26.4429 27.2863C26.7724 27.582 27.2762 27.5689 27.5893 27.2558L29.2559 25.5892C29.5626 25.2825 29.5828 24.7918 29.3023 24.4609L28.3945 23.3905L28.9562 22.0338L30.5429 21.6215C30.9102 21.526 31.1667 21.1944 31.1667 20.8149V19.1666C31.1667 18.7855 30.9081 18.4529 30.5388 18.359L28.9619 17.9578L28.4016 16.6044L29.3031 15.5379C29.5828 15.207 29.5623 14.717 29.2559 14.4107L27.5893 12.744C27.2817 12.4364 26.7892 12.4171 26.4586 12.6998L25.3999 13.6046L23.9988 13.0286L23.5851 11.4547C23.4889 11.0885 23.1578 10.8333 22.7792 10.8333H21.1508ZM27.5346 24.9534L26.9645 25.5236L26.9583 25.5181C26.6505 25.2501 26.2541 24.911 26.0305 24.7512C25.7965 24.5839 25.4927 24.5491 25.227 24.6592L23.0178 25.5742C22.7746 25.6749 22.5934 25.8845 22.5288 26.1397L22.1846 27.4999H21.8157L21.4721 26.1392C21.4075 25.8832 21.2254 25.673 20.9812 25.5726L18.8095 24.6792C18.5268 24.5629 18.203 24.6108 17.966 24.804L17.057 25.545L16.4791 24.9672L17.2186 24.1379C17.4327 23.8978 17.4895 23.556 17.3646 23.2595L16.4354 21.0554C16.336 20.8196 16.1337 20.6425 15.8868 20.5751L14.5 20.1968V19.8278L15.8336 19.5164C16.0971 19.4549 16.3143 19.2693 16.4162 19.0187L17.3162 16.8045C17.4306 16.5229 17.3827 16.2013 17.191 15.9654L16.4539 15.0578L17.0334 14.4784L17.8661 15.2192C18.1062 15.4328 18.4476 15.4893 18.7437 15.3645L20.9479 14.4353C21.1861 14.3349 21.3642 14.1296 21.4301 13.8795L21.7932 12.4999H22.1366L22.4924 13.8534C22.5588 14.1061 22.7398 14.313 22.9815 14.4123L25.2373 15.3398C25.5265 15.4587 25.8579 15.4057 26.0956 15.2025L26.9557 14.4674L27.5355 15.0473L26.8011 15.9161C26.5998 16.1542 26.5483 16.4848 26.6675 16.7728L27.5817 18.9812C27.6822 19.224 27.8915 19.4052 28.1462 19.47L29.5 19.8145V20.1705L28.1354 20.525C27.8825 20.5908 27.675 20.7713 27.5751 21.0128L26.6601 23.2228C26.5406 23.5113 26.5925 23.8424 26.7944 24.0806L27.5346 24.9534Z"
              fill="#757575"
            />
          </g>
          <defs>
            <clipPath id="clip0_3_174">
              <rect
                width={20}
                height={20}
                fill="white"
                transform="translate(12 10)"
              />
            </clipPath>
          </defs>
        </svg>
      </div>
      <div className="w-full h-10 self-end rounded-[0px_0px_0.75rem_0.75rem] bg-slate-500"></div>
    </div>
  );
}

export default Sidebar;
