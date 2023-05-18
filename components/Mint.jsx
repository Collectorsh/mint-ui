import { useState, useContext } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import FileUpload from "/components/FileUpload";
import Details from "/components/Details";
import Review from "/components/Review";
import StageContext from "/contexts/stage";

import {
  Metaplex,
  walletAdapterIdentity,
  toMetaplexFileFromBrowser,
  bundlrStorage,
} from "@metaplex-foundation/js";
import { Connection } from "@solana/web3.js";

export default function Mint() {
  const wallet = useWallet();
  const [file, setFile] = useState();
  const [image, setImage] = useState();
  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [royalty, setRoyalty] = useState();
  const [isMinting, setIsMinting] = useState(false);
  const [stage] = useContext(StageContext);

  const connection = new Connection(process.env.NEXT_PUBLIC_RPC);
  const metaplex = new Metaplex(connection)
    .use(
      bundlrStorage({
        address:
          process.env.NEXT_PUBLIC_NETWORK === "devnet"
            ? "https://devnet.bundlr.network"
            : "https://node1.bundlr.network",
        providerUrl: process.env.NEXT_PUBLIC_RPC,
        timeout: 60000,
      })
    )
    .use(walletAdapterIdentity(wallet));

  const updateFile = (f) => {
    setFile(f);
  };

  const updateImage = (i) => {
    setImage(i);
  };

  const updateName = (n) => {
    setName(n);
  };

  const updateDescription = (d) => {
    setDescription(d);
  };

  const updateRoyalty = (r) => {
    setRoyalty(r);
  };

  const mintNFT = async () => {
    setIsMinting(true);
    try {
      toast("Uploading your file to Arweave");
      const metaplexFile = await toMetaplexFileFromBrowser(file);
      const url = await metaplex.storage().upload(metaplexFile);
      const { uri } = await metaplex.nfts().uploadMetadata({
        name: name,
        description: description,
        image: url,
        properties: {
          files: [
            {
              type: file.type,
              uri: url,
            },
          ],
        },
      });
      toast("Minting your NFT");
      const { nft } = await metaplex.nfts().create({
        uri: uri,
        name: name,
        sellerFeeBasisPoints: royalty,
      });
      toast.success(`🎉 Congratulations you minted ${nft.name}`);
    } catch (err) {
      toast.error(err.message);
    }
    setIsMinting(false);
  };

  return (
    <>
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <main className="mt-6">
        <div className="text-right">
          <WalletMultiButton />
        </div>
        <div className="my-6 text-center">
          <ul>
            <li
              className={`inline px-2 ${
                stage === 1 &&
                "font-extrabold border-b border-b-2 border-greeny"
              }`}
            >
              Upload
            </li>
            <li className="mx-3 inline">&middot;</li>
            <li
              className={`inline px-2 ${
                stage === 2 &&
                "font-extrabold border-b border-b-2 border-greeny"
              }`}
            >
              Details
            </li>
            <li className="mx-3 inline">&middot;</li>
            <li
              className={`inline px-2 ${
                stage === 3 &&
                "font-extrabold border-b border-b-2 border-greeny"
              }`}
            >
              Review &amp; Mint
            </li>
          </ul>
        </div>
        {wallet && wallet.publicKey ? (
          <>
            {stage === 1 && (
              <FileUpload
                file={file}
                image={image}
                updateFile={updateFile}
                updateImage={updateImage}
              />
            )}
            {stage === 2 && (
              <Details
                updateName={updateName}
                updateDescription={updateDescription}
                updateRoyalty={updateRoyalty}
              />
            )}
            {stage === 3 && (
              <Review
                name={name}
                description={description}
                royalty={royalty}
                image={image}
                mintNFT={mintNFT}
                isMinting={isMinting}
              />
            )}
          </>
        ) : (
          <p>Connect your wallet to start</p>
        )}
      </main>
    </>
  );
}
