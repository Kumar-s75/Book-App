import BookList from "@/components/BookList";
import BookOverview from "@/components/BookOverview";
import { Button } from "@/components/ui/button";


const Home=()=> {
  return (
   <>
   {/* <Button className="">Click me!</Button> */}
   <BookOverview/>
   <BookList/>
   </>
  );
}


export default Home;