use swc_core::ecma::{
    ast::*,
    visit::{VisitMut, VisitMutWith},
};
use swc_core::plugin::{plugin_transform, proxies::TransformPluginProgramMetadata};

pub struct RemoveConsoleLog;

// VisitMut トレイトを実装して、AST を変換
impl VisitMut for RemoveConsoleLog {
    fn visit_mut_stmt(&mut self, stmt: &mut Stmt) {
        // 子ノードを先に処理
        stmt.visit_mut_children_with(self);

        // ExprStmt の場合のみ処理
        if let Stmt::Expr(expr_stmt) = stmt {
            if should_remove_expr(&expr_stmt.expr) {
                // console.log() を空文のブロックに置き換え
                *stmt = Stmt::Empty(EmptyStmt { span: expr_stmt.span });
            }
        }
    }
}

// console.log(...) を検出するヘルパー関数
fn should_remove_expr(expr: &Expr) -> bool {
    if let Expr::Call(call_expr) = expr {
        if let Callee::Expr(callee) = &call_expr.callee {
            if let Expr::Member(member_expr) = &**callee {
                // console.log(...) を検出
                if let Expr::Ident(obj) = &*member_expr.obj {
                    if obj.sym.as_ref() == "console" {
                        if let MemberProp::Ident(ident_name) = &member_expr.prop {
                            return ident_name.sym.as_ref() == "log";
                        }
                    }
                }
            }
        }
    }
    false
}

// プラグインのエントリーポイント
#[plugin_transform]
pub fn process_transform(mut program: Program, _metadata: TransformPluginProgramMetadata) -> Program {
    program.visit_mut_with(&mut RemoveConsoleLog);
    program
}
