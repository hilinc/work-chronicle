import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Plus } from "lucide-react";
import { Button } from "./ui/button";
import { TooltipProvider, TooltipRoot, TooltipTrigger, TooltipContent } from "./ui/tooltip";
import { db, type WorkRecord } from "@/db";

export const WorkRecordList = () => {
  const navigate = useNavigate();
  const [records, setRecords] = useState<WorkRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRecords = async () => {
      try {
        const allRecords = await db.workRecords.orderBy("createdAt").reverse().toArray();
        setRecords(allRecords);
      } catch (error) {
        console.error("加载工作记录失败", error);
      } finally {
        setLoading(false);
      }
    };

    loadRecords();
  }, []);

  const handleRecordClick = (id: number) => {
    navigate(`/edit/${id}`);
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleString("zh-CN", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusClass = (status: WorkRecord["status"]) => {
    switch (status) {
      case "进行中":
        return "bg-blue-100 text-blue-700";
      case "已完成":
        return "bg-green-100 text-green-700";
      case "已取消":
        return "bg-gray-100 text-gray-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <TooltipProvider>
      <div className="w-full mx-auto">
        <div className="flex justify-between items-center mb-6">
          <Button onClick={() => navigate("/new")} className="flex items-center gap-1">
            <Plus className="h-4 w-4" />
            新建记录
          </Button>
        </div>

        {loading ? (
          <div className="flex justify-center py-8">加载中...</div>
        ) : records.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <p className="text-gray-500 mb-4">暂无工作记录</p>
            <Button onClick={() => navigate("/new")}>创建第一条记录</Button>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="min-w-full divide-y divide-gray-200">
              <div className="bg-gray-50 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider grid grid-cols-12 gap-4">
                <div className="col-span-3">标题</div>
                <div className="col-span-2">状态</div>
                <div className="col-span-3">工作内容</div>
                <div className="col-span-2">创建日期</div>
                <div className="col-span-2">更新日期</div>
              </div>
              <div className="bg-white divide-y divide-gray-200">
                {records.map(record => (
                  <div
                    key={record.id}
                    className="grid grid-cols-12 gap-4 px-6 py-4 hover:bg-gray-50 cursor-pointer"
                    onClick={() => record.id && handleRecordClick(record.id)}
                  >
                    <div className="col-span-3 font-medium text-gray-900 truncate">{record.title}</div>
                    <div className="col-span-2">
                      <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${getStatusClass(record.status)}`}>
                        {record.status}
                      </span>
                    </div>
                    <div className="col-span-3">
                      <TooltipRoot>
                        <TooltipTrigger asChild>
                          <div className="truncate cursor-help">{record.content}</div>
                        </TooltipTrigger>
                        <TooltipContent side="top" className="max-w-xs">
                          <div className="whitespace-pre-wrap break-words">{record.content}</div>
                        </TooltipContent>
                      </TooltipRoot>
                    </div>
                    <div className="col-span-2 text-sm text-gray-500">{formatDate(record.createdAt)}</div>
                    <div className="col-span-2 text-sm text-gray-500">{formatDate(record.updatedAt)}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </TooltipProvider>
  );
};
