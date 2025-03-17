export default function Footer() {
    return (
      <footer className="bg-gray-100 border-t">
        <div className="container mx-auto px-4 py-6">
          <p className="text-center text-gray-600">
            &copy; {new Date().getFullYear()} コーヒー記録アプリ
          </p>
        </div>
      </footer>
    );
  }