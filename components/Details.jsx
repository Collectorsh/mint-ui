import { useState, useContext } from "react";
import StageContext from "/contexts/stage";

export default function Details({
  updateName,
  updateDescription,
  updateRoyalty,
}) {
  const [, setStage] = useContext(StageContext);
  const [error, setError] = useState();

  const forward = (e) => {
    e.preventDefault();
    let name = document.getElementById("name").value;
    if (!name) {
      setError("Name is required");
      return;
    }
    if (name.length > 32) {
      setError("Name max length is 32");
      return;
    }
    updateName(name);
    let desc = document.getElementById("description").value;
    if (!desc) {
      setError("Description is required");
      return;
    }
    updateDescription(desc);
    let royalty = document.getElementById("royalty").value;
    updateRoyalty(royalty * 100);
    setStage(3);
  };

  return (
    <>
      <section className="container">
        {error && <p className="text-red-500 max-w-xl mx-auto">{error}</p>}
        <form action="#" method="POST" className="mx-auto mt-4 max-w-xl">
          <div className="grid grid-cols-1">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-semibold leading-6 text-gray-900"
              >
                Name (max 32 characters)
              </label>
              <div className="mt-2.5">
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="mt-4">
              <label
                htmlFor="description"
                className="block text-sm font-semibold leading-6 text-gray-900"
              >
                Description
              </label>
              <div className="mt-2.5">
                <textarea
                  name="description"
                  id="description"
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                ></textarea>
              </div>
            </div>
            <div className="mt-4">
              <label
                htmlFor="royalty"
                className="block text-sm font-semibold leading-6 text-gray-900"
              >
                Royalty %
              </label>
              <div className="mt-2.5">
                <input
                  type="number"
                  name="royalty"
                  id="royalty"
                  max="100"
                  min="0"
                  defaultValue="10"
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>
          <button
            className="bg-black text-white px-4 py-2 rounded-3xl mt-6"
            onClick={(e) => forward(e)}
          >
            Continue
          </button>
        </form>
      </section>
    </>
  );
}
