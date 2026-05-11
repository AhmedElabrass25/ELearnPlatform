import { Path } from "@/types";
import { getTracks } from "@/services/tracks.service";
import { PathCard } from "@/components/path/PathCard";

export default async function PathsPage() {
  let paths: Path[] = [];
  let hasError = false;
  try {
    paths = await getTracks();
  } catch (error) {
    hasError = true;
  }
console.log(paths);
  return (
    <div className="container py-12 px-4 md:px-6">
      <div className="max-w-2xl mx-auto text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
          المسارات التعليمية
        </h1>
        <p className="text-lg text-muted-foreground">
          اختر المسار المناسب لك من الصفر وحتى الاحتراف مع منهج منظم خطوة بخطوة.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {hasError ? (
          <div className="text-center text-destructive font-bold col-span-full p-12 border-2 border-dashed border-destructive/20 rounded-2xl bg-destructive/5 backdrop-blur-sm">
            فشل في تحميل المسارات التعليمية. يرجى التحقق من الاتصال بالإنترنت.
          </div>
        ) : paths?.length > 0 ? (
          paths.map((path) => <PathCard path={path} key={path._id} />)
        ) : (
          <div className="text-center text-muted-foreground col-span-full py-20">
            لا توجد مسارات تعليمية حالياً
          </div>
        )}
      </div>
    </div>
  );
}
