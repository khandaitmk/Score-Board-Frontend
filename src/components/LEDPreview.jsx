
import { IoIosLogOut } from "react-icons/io";
import { Button } from "@/components/ui/button";
import rbuLogo from "../assets/rbu-logo.png";
import { logout } from "../lib/auth";
export function LEDPreview({ rows, brightness ,onLogout}) {
  const opacity = brightness / 100;

  return (
    <div className="w-full bg-linear-to-b from-[hsl(220,30%,8%)] to-[hsl(220,25%,12%)] py-8 px-4">
      {/* University Header */}
      <div>
        <div className="flex items-center justify-center gap-4 mb-6">
        <div className="w-16 h-16 rounded-full bg-linear-to-br from-orange-500 to-red-600 flex items-center justify-center border-2 border-blue-500">
          <img src={rbuLogo} className=" rounded-full"></img>
        </div>
        <div className="text-center">
          <h1 className="text-xl md:text-2xl font-bold text-foreground">
            Ramdeobaba University
          </h1>
          <p className="text-muted-foreground text-sm">
            Sports Department- ScoreBoard Display
          </p>
        </div>
        
      </div>
      <div className=" flex items-center justify-center mb-10">
          <Button
              onClick={()=>{
                logout();
                onLogout();
              }
              }
              className="flex items-center justify-center cursor-pointer bg-red-500 hover:scale-105 transition-all duration-200 text-white gap-2 rounded-lg"
            >
                <IoIosLogOut></IoIosLogOut>
              <p>Logout</p>
            </Button>
        </div>
      </div>
      {/* LED Panel */}
      <div className="max-w-xl mx-auto">
        <div
          className="led-panel rounded-lg border border-[hsl(var(--led-grid))] overflow-hidden"
          
        >
          <div  className="grid grid-rows-6 min-h-[250px] md:min-h-[300px]">
            {rows.map((row) => (
              <div
                key={row.id}
                className="flex items-center justify-center border-b border-[hsl(var(--led-grid))] last:border-b-0 px-4 py-2"
              >
                <span style={{ opacity }}
                  className="led-text text-[hsl(var(--led-red))] text-lg md:text-2xl font-bold tracking-wider text-center"
                >
                  {row.content || "\u00A0"}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
