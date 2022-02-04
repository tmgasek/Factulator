export default function WikiBox({ wikiTitles, wikiLinks, num }) {
  return (
    <div className="md:w-1/3 h-auto ">
      {wikiTitles ? (
        <h2 className="text-lg m-2 bg-accent1 pl-2">
          Wikipedia pages related to the number{' '}
          <span className="bg-accent2 m-1">{num}</span>
        </h2>
      ) : (
        <h2 className="text-lg m-2 bg-accent1 animate-bounce pl-2">...</h2>
      )}

      <div className="bg-accent2 break-words m-4 ">
        {wikiTitles &&
          wikiTitles.map((link, index) => (
            <div className="m-1" key={link}>
              <a
                className="hover:underline hover:bg-secondary"
                href={wikiLinks[index]}
              >
                {link}
              </a>
            </div>
          ))}
      </div>
    </div>
  );
}
