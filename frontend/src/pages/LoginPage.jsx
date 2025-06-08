import Input from "../components/Input";


const LoginPage = () => {
  return (
    <section className="min-h-[calc(100vh-7rem)] flex items-center justify-center relative">
      <div className="w-full m-4">
        <form className="bg-white dark:bg-blue-950 shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <Input />
          <Input />
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
            >
              Sign In
            </button>
            <a
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
              href="#"
            >
              Forgot Password?
            </a>
          </div>
        </form>
      </div>
    </section>
  );
};

export default LoginPage;
