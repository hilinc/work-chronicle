import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { WorkRecordForm } from "@/components/work-record-form";
import { db, type WorkRecord } from "@/db";

export default function EditRecordPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [record, setRecord] = useState<WorkRecord | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecord = async () => {
      if (!id) {
        navigate("/");
        return;
      }

      try {
        const recordId = parseInt(id, 10);
        const fetchedRecord = await db.workRecords.get(recordId);

        if (!fetchedRecord) {
          navigate("/");
          return;
        }

        setRecord(fetchedRecord);
      } catch (error) {
        console.error("获取记录失败", error);
        navigate("/");
      } finally {
        setLoading(false);
      }
    };

    fetchRecord();
  }, [id, navigate]);

  if (loading) {
    return <div className="py-8 flex justify-center">加载中...</div>;
  }

  if (!record) {
    return null;
  }

  return (
    <div className="py-8">
      <WorkRecordForm initialData={record} isEditing />
    </div>
  );
}
