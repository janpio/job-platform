import { simplifyName } from "@/lib/utils";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { useSession } from "next-auth/react";

function getFirstTwoWords(fullName: string): string {
  const words = fullName.split(" ");
  const firstTwoWords = words.slice(0, 2);
  return firstTwoWords.join(" ");
}

function generateUsername(fullName: string): string {
  const words = fullName.split(" ");
  const firstTwoWords = words.slice(0, 2);
  const username = `@${firstTwoWords.join("").toLowerCase()}`;
  return username;
}

const MiniProfile = () => {
  const { data: session } = useSession();

  return (
    <div className="min-h-[15rem] bg-yellow-300 flex flex-col px-8 rounded-b-xl">
      <div className="py-4">
        <label htmlFor="table-search" className="sr-only">
          Search
        </label>
        <div className="relative mt-1">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <MagnifyingGlassIcon
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </div>
          <input
            type="text"
            id="table-search"
            className="bg-gray-50 border-none outline-none text-gray-900 text-sm rounded-2xl focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5"
            placeholder="Puesto, empresa o palabra clave"
          />
        </div>
      </div>
      <div className="flex mt-12 gap-4 items-center">
        {session && (
          <>
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center overflow-hidden">
              <Avatar>
                <AvatarImage
                  src={session.user.image}
                  alt={`@${session.user.name}`}
                />
                <AvatarFallback>
                  {simplifyName(session.user.name)}
                </AvatarFallback>
              </Avatar>
            </div>
            <div>
              <h3 className="font-bold">
                {getFirstTwoWords(session.user.name)}
              </h3>
              <p className="text-black text-opacity-50">
                {generateUsername(session.user.name)}
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MiniProfile;
