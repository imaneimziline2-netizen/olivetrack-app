// function Modal({ isOpen, onClose, title, children }) {
//     if (!isOpen) return null;

//     return (
//         <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
//             <div
//                 className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-lime-100 animate-in fade-in zoom-in-95 duration-150"
//                 onClick={(e) => e.stopPropagation()}
//             >
//                 <div className="flex items-center justify-between pb-3 mb-4 border-b border-gray-100">
//                     <h3 className="text-lg font-bold text-lime-900">{title}</h3>
//                     <button
//                         onClick={onClose}
//                         className="text-gray-400 hover:text-gray-600 rounded-lg p-1 transition-colors cursor-pointer text-xl leading-none"
//                     >
//                         ×
//                     </button>
//                 </div>
//                 <div>{children}</div>
//             </div>
//         </div>
//     );
// }

// export default Modal;
