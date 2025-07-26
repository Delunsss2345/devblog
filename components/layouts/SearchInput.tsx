import { Search } from "lucide-react";
import { Input } from "../ui/input";

const SearchInput = () => {
  return (
    <div className="relative hidden sm:block">
      <Search size={18} className="absolute top-1/2 -translate-y-1/2 left-2" />
      <Input
        className="pl-10 bg-primary/10 text-muted-foreground"
        placeholder="Search"
      />
    </div>
  );
};

export default SearchInput;
