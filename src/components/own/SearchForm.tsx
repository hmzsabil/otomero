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
import TooltipLayout from "./TooltipLayout";
import { animateInput } from "@/src/lib/animate";

export default function SearchForm() {

  const input = useRef<HTMLInputElement | null>(null);
  const container = useRef<HTMLDivElement | null>(null)
  const formRef = useRef<HTMLFormElement | null>(null)

  const {
    form,
    searchOpen, searchValue, setSearchValue,
    handleSearchCloseClick, handleSearchDeleteClick, handleSearchIconClick,
    onSearchSubmit
  } = useSearchForm()



  const focusOnInput = useCallback(() => {
    if (!searchOpen || !input.current) return;

    input.current.focus()
  }, [searchOpen, input])
  


  useEffect(() => {
    animateInput(container, searchOpen)
    setTimeout(() => {
      focusOnInput()
    }, 900)
  }, [searchOpen, input , animateInput])

  return (
    <div className="flex items-center gap-x-2">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSearchSubmit)} className="flex items-center gap-x-2" ref={formRef}>
          <TooltipLayout text={searchOpen ? 'Search...' : 'Open search'}>
            <Button aria-label={searchOpen ? 'Search & Get Results' : 'Open Search Input'} onClick={handleSearchIconClick} variant='ghost' type={searchOpen === true ? 'submit' : "button"} className="hover:bg-transparent hover:text-inherit lg:hoverGrow">
              <Search aria-description="search button" size={20} className="cursor-pointer" />
            </Button>
          </TooltipLayout>


          <FormField
            control={form.control}
            name="artist"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div aria-hidden={searchOpen ? "false" : "true"} className="hidden items-center gap-x-2" ref={container}>
                    <div className="flex items-center gap-x-2 border rounded-md pr-5 h-max lg:h-auto">
                      <Input aria-invalid={!!form.formState.errors} aria-describedby={form.formState.errors ? 'artist-error' : undefined} ref={input} autoFocus onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setSearchValue(e.target.value);
                        field.onChange(e.target.value)
                      }} value={searchValue} className={cn("text-[15px] border-0 h-full rounded-md focus-visible:outline-none lg:px-6 lg:py-3")} />
                      {searchValue.trim().length > 1 && <Button onClick={handleSearchDeleteClick} aria-label="Delete Search Input" variant='ghost' className="hover:bg-transparent hover:text-white hover:scale-110 transition-transform"><Delete size={20} /></Button>}
                    </div>
                  <TooltipLayout text='Close search'>
                    <Button onClick={handleSearchCloseClick} aria-label="close search input" variant='ghost' className="hover:bg-transparent hover:text-white hover:scale-110 transition-transform">
                      <X size={20} className={cn("transition-opacity duration-200 delay-300", searchOpen ? 'opacity-100' : "opacity-0")} />
                    </Button>
                  </TooltipLayout>
                  </div>
                </FormControl>
                <FormMessage id="artist-error" />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  )
};
