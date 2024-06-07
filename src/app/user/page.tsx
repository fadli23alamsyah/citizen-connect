export default function UserPage() {
  return (
    <main className="flex flex-col justify-center items-center h-[calc(100vh-8rem)] gap-2 px-3 mb-16 md:mb-0">
      <h1 className="font-bold font-mono text-3xl md:text-6xl text-sky-400 tracking-wider text-center">Citizen User</h1>
      <h4 className="font-sans text-sm md:text-base text-center">Silahkan Login untuk mengetahui hal menarik di sekitar anda</h4>
      <form className="flex flex-col gap-5 md:w-1/3 mt-10">
        <div>
          <label htmlFor="username">Username</label>
          <input 
            id="username"
            className="w-full rounded-md bg-slate-200 p-2 text-sm outline-none text-slate-900" 
            type="text" 
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input 
            id="password"
            className="w-full rounded-md bg-slate-200 p-2 text-sm outline-none text-slate-900" 
            type="password"
            required 
          />
        </div>
        <button type="submit" className="bg-sky-400 text-white font-bold mt-10 py-3 rounded-md">
          SUBMIT
        </button>
      </form>
    </main>
  );
}