import Link from "next/link";

const NotFound = () => {
    return (
        <div className="flex justify-center items-center min-h-screen flex-col">
            <div className="flex justify-center items-center mb-5">PAGE NOT FOUND!</div>
            <div><Link href="/" className="underline font-bold hover:text-red-400">Back To Home</Link></div>
        </div>
    )
}

export default NotFound;