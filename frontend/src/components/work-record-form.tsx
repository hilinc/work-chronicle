import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { RadioGroup, RadioOption } from "./ui/radio-group";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { db, type WorkRecord } from "@/db";

interface WorkRecordFormProps {
  initialData?: WorkRecord;
  isEditing?: boolean;
}

export const WorkRecordForm = ({ initialData, isEditing = false }: WorkRecordFormProps) => {
  const navigate = useNavigate();
  const [title, setTitle] = useState(initialData?.title || "");
  const [status, setStatus] = useState<WorkRecord["status"]>(initialData?.status || "进行中");
  const [content, setContent] = useState(initialData?.content || "");
  const [titleError, setTitleError] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setTitleError("");

    if (!title.trim()) {
      setTitleError("标题不能为空");
      return;
    }

    if (title.length > 20) {
      setTitleError("标题不能超过20个字符");
      return;
    }

    try {
      const now = new Date();
      if (isEditing && initialData?.id) {
        await db.workRecords.update(initialData.id, {
          title,
          status,
          content,
          updatedAt: now,
        });
      } else {
        await db.workRecords.add({
          title,
          status,
          content,
          createdAt: now,
          updatedAt: now,
        });
      }
      navigate("/");
    } catch (error) {
      console.error("保存记录失败", error);
    }
  };

  return (
    <Card className="w-full mx-auto">
      <CardHeader>
        <CardTitle>{isEditing ? "编辑工作记录" : "新建工作记录"}</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">标题</label>
            <Input value={title} onChange={e => setTitle(e.target.value)} placeholder="请输入标题（最多20个字符）" maxLength={20} />
            {titleError && <p className="text-sm text-red-500">{titleError}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">工作状态</label>
            <RadioGroup>
              <RadioOption name="status" value="进行中" checked={status === "进行中"} onChange={() => setStatus("进行中")}>
                进行中
              </RadioOption>
              <RadioOption name="status" value="已完成" checked={status === "已完成"} onChange={() => setStatus("已完成")}>
                已完成
              </RadioOption>
              <RadioOption name="status" value="已取消" checked={status === "已取消"} onChange={() => setStatus("已取消")}>
                已取消
              </RadioOption>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">工作内容</label>
            <Textarea value={content} onChange={e => setContent(e.target.value)} placeholder="请输入工作内容（最多1000个字符）" maxLength={1000} />
          </div>
        </CardContent>
        <CardFooter className="justify-end space-x-4">
          <Button type="button" variant="outline" onClick={() => navigate("/")}>
            取消
          </Button>
          <Button type="submit">{isEditing ? "更新" : "保存"}</Button>
        </CardFooter>
      </form>
    </Card>
  );
};
