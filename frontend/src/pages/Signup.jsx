import { Link } from "react-router-dom";

import Error from "../components/form/Error";
import InputArea from "../components/form/InputArea";
import LabelArea from "../components/form/LabelArea";
import useLoginSubmit from "../hooks/useLoginSubmit";

export default function Signup() {
  const { onSubmit, register, handleSubmit, errors } = useLoginSubmit();

  return (
    <section className="bg-gray-50 dark:bg-gray-900 h-[100vh]">
      <div className="h-[100vh] flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a
          href="https://brainstation-23.com/"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <img
            className="w-8 h-8 mr-2"
            src="https://media.licdn.com/dms/image/C510BAQEhBWM1jX08fw/company-logo_200_200/0/1566279758471?e=2147483647&v=beta&t=sqbG-kspT36qU5G-4JfoHNo7Tw18ZSJvXFt5WbuLKC4"
            alt="logo"
          />
          Brain Station 23
        </a>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign up to your account
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div>
                <LabelArea label="Your username" />
                <InputArea
                  register={register}
                  type="text"
                  name="username"
                  label="username"
                  placeholder="Hasibul Hasan"
                  required={true}
                />
                <Error errorName={errors.username} />
              </div>
              <div>
                <LabelArea label="Your Phone Number" />
                <InputArea
                  register={register}
                  type="text"
                  name="phone"
                  label="phone"
                  placeholder="01x-xxxxxxxx"
                  required={true}
                />
                <Error errorName={errors.phone} />
              </div>

              <div>
                <LabelArea label="Your Email" />
                <InputArea
                  register={register}
                  type="email"
                  name="email"
                  label="email"
                  placeholder="example@gmail.com"
                  required={true}
                />
                <Error errorName={errors.email} />
              </div>
              <div>
                <LabelArea label="Your Password" />
                <InputArea
                  register={register}
                  type="text"
                  name="password"
                  label="password"
                  placeholder="********"
                  required={true}
                />
                <Error errorName={errors.password} />
              </div>

              <button
                type="submit"
                className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Signup
              </button>

              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have account?{" "}
                <Link
                  to="/login"
                  className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                >
                  Log In
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
