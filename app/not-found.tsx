import Link from 'next/link'
import { FaHome } from "react-icons/fa";

const  NotFound: React.FC = () => {
    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 text-center">
            <h2 className="text-9xl font-bold text-gray-200 dark:text-gray-800 mb-4">404</h2>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4 font-quran">
                عذراً، الصفحة غير موجودة
            </h1>
            <p className="text-gray-600 dark:text-gray-400 max-w-md mb-8 text-lg">
                يبدو أنك وصلت إلى رابط غير صحيح أو تم حذف الصفحة التي تبحث عنها.
            </p>

            <Link
                href="/"
                className="flex items-center gap-2 bg-[#0e582d] hover:bg-[#0b4623] text-white px-6 py-3 rounded-lg transition-colors duration-300 font-medium"
            >
                <FaHome size={20}/>
                <span>العودة للرئيسية</span>
            </Link>
        </div>
    )
}
export default NotFound

