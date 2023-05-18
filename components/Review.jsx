import { Oval } from "react-loader-spinner";

export default function Review({
  name,
  description,
  royalty,
  image,
  mintNFT,
  isMinting,
}) {
  return (
    <section className="container">
      <div className="grid grid-cols-2 gap-12">
        <div>
          {image && (
            <img
              src={image}
              className="max-h-96 mx-auto object-center object-cover"
            />
          )}
        </div>
        <dl>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="font-medium leading-6 text-neutral-500">Name</dt>
            <dd className="mt-1 leading-6 sm:col-span-2 sm:mt-0">{name}</dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="font-medium leading-6 text-neutral-500">
              Description
            </dt>
            <dd className="mt-1 leading-6 sm:col-span-2 sm:mt-0">
              {description}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="font-medium leading-6 text-neutral-500">Royalty</dt>
            <dd className="mt-1 leading-6 sm:col-span-2 sm:mt-0">
              {royalty / 100}%
            </dd>
          </div>
        </dl>
        <div className="col-span-2">
          {isMinting ? (
            <button className="bg-black text-white px-4 py-2 rounded-3xl mt-6 w-full">
              <div className="mx-auto w-fit">
                <Oval
                  color="#fff"
                  secondaryColor="#000"
                  height={15}
                  width={15}
                />
              </div>
            </button>
          ) : (
            <button
              className="bg-black text-white px-4 py-2 rounded-3xl mt-6 w-full"
              onClick={mintNFT}
            >
              Mint
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
