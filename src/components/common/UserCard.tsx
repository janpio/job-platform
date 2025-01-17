import { careerData, formatDate, simplifyName } from "@/lib/utils";
import { Student } from "@/types/db";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Card, CardContent, CardDescription, CardHeader } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

interface UserCardProps {
  user: {
    name: string;
    lastName: string;
    createdAt: string;
    Student: [{ name: string; lastName: string; image: string }];
  };
  setUser: (user: any) => void;
}

interface StudentCardProps {
  user: Student;
  setUser: (user: any) => void;
}

const UserCard = ({ user, setUser }: UserCardProps) => {
  if (!user) return null;

  return (
    <Card>
      <CardHeader>
        <div className="text-sm text-muted-foreground flex justify-between">
          <p>Creado el {formatDate(user.createdAt)}</p>
          <XMarkIcon
            className="w-5 h-5 text-gray-400 hover:text-gray-900"
            onClick={() => setUser(null)}
          />
        </div>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="flex items-center space-x-4 rounded-md border p-4">
          <Avatar>
            <AvatarImage
              className="object-cover"
              src={user.Student[0]?.image}
              alt={user.name}
            />
            <AvatarFallback>
              {simplifyName(user.Student[0]?.name)}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium leading-none">
              {user.Student[0]?.name}
            </p>
            <p className="text-sm text-muted-foreground">@{user.name}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const UserCardFallback = () => {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-4 w-[250px]" />
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="w-full overflow-hidden flex items-center space-x-4 rounded-md border p-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="w-[70%] flex flex-col gap-2">
            <Skeleton className="h-4 w-[200px] lg:w-[250px]" />
            <Skeleton className="h-4 w-[150px] lg:w-[200px]" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const StudentCard = ({ user, setUser }: StudentCardProps) => {
  if (!user) return null;
  const userCareerName = careerData[user.career].name;

  return (
    <Card>
      <CardHeader>
        <div className="text-sm text-muted-foreground flex justify-between">
          <p>Estudiante de {userCareerName}</p>
          <XMarkIcon
            className="w-5 h-5 text-gray-400 hover:text-gray-900"
            onClick={() => setUser(null)}
          />
        </div>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="flex items-center space-x-4 rounded-md border p-4 overflow-hidden">
          <Avatar>
            <AvatarImage
              className="object-cover"
              src={user.image || ""}
              alt={user.name}
            />
            <AvatarFallback>{simplifyName(user.name)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium leading-none">
              {user.name} {user.lastname}
            </p>
            <p className="text-sm text-muted-foreground max-w-[10rem] overflow-hidden whitespace-nowrap text-ellipsis">
              {user.email}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export { UserCard, UserCardFallback, StudentCard };
