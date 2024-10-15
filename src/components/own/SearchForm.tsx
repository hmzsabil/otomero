import { Search, X, Delete } from "lucide-react";
import { useCallback, useEffect, useRef } from "react";
import { Input } from "../ui/input";
import { cn } from "@/src/lib/utils";
import gsap from "gsap";
import { Button } from "@/src/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/src/components/ui/form"
import useSearchForm from "@/src/hooks/useSearchForm";

export default function SearchForm() {

  const input = useRef<HTMLInputElement>(null);
  const container = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLFormElement>(null)

  const {
    form,
    searchOpen, searchValue, setSearchValue,
    handleSearchCloseClick, handleSearchDeleteClick, handleSearchIconClick,
    onSearchSubmit
  } = useSearchForm()


  const animateInput = useCallback(() => {
    if (searchOpen) {
      gsap.to(container.current, {
        width: 150,
        display: "flex",
        duration: .9,
        ease: "power2.Out",
      });
    }
    else {
      gsap.to(container.current, {
        width: 0,
        display: "none",
        duration: .5,
        ease: "power2.Out"
      })
    }
  }, [searchOpen])

  useEffect(() => {
    animateInput()

    if (searchOpen && input.current){
      input.current.focus();
    }
  }, [searchOpen, animateInput])

  return (
    <div className="flex items-center gap-x-2">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSearchSubmit)} className="flex items-center gap-x-2" ref={formRef}>

          <Button onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
            if (!searchOpen){
              e.preventDefault()
              handleSearchIconClick()
            }
          }} variant='ghost' type={searchOpen === true ? 'submit' : "button"} className="hover:bg-transparent hover:text-white hover:scale-110 transition-transform">
            <Search size={20} className="cursor-pointer" />
          </Button>


          <FormField
            control={form.control}
            name="artist"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="hidden items-center gap-x-2 border rounded-md pr-5 h-max lg:h-auto" ref={container}>
                    <Input ref={input} autoFocus onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setSearchValue(e.target.value);
                      field.onChange(e.target.value)
                    }} value={searchValue} className={cn("text-[15px] border-0 h-full rounded-md focus-visible:outline-none lg:px-6 lg:py-3")} />
                    {searchValue.trim().length > 1 && <Delete size={20} className="cursor-pointer" onClick={handleSearchDeleteClick} />}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>

      <Button onClick={handleSearchCloseClick} variant='ghost' className="hover:bg-transparent hover:text-white hover:scale-110 transition-transform">
        <X size={20} className={cn("transition-opacity duration-200 delay-300", searchOpen ? 'opacity-100' : "opacity-0")} />
      </Button>
    </div>
  )
};
