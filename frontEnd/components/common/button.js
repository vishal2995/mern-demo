import Link from "next/link";

function Buttons() {
  return (
    <>
      <button className="btn btn-primary me-3" type="submit">
        Submit
      </button>
      <Link href="/users" className="btn btn-secondary">
        Cancel
      </Link>
    </>
  );
}

export default Buttons;
