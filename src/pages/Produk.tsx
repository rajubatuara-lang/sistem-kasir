import { useMemo, useState } from 'react';
import { Search, Plus, Pencil, Trash2, Package } from 'lucide-react';
import { CATEGORIES } from '@/data';
import type { Product, ProductStatus } from '@/types';
import { formatRupiah } from '@/lib/format';
import { ProductStatusBadge } from '@/components/Badges';
import { useToast } from '@/components/ToastProvider';
import Modal from '@/components/Modal';

interface ProdukProps {
  products: Product[];
  onAdd: (product: Omit<Product, 'id'>) => Promise<{ success: boolean; product?: Product; error?: string }>;
  onEdit: (id: string, product: Partial<Product>) => Promise<{ success: boolean; product?: Product; error?: string }>;
  onDelete: (id: string) => Promise<{ success: boolean; error?: string }>;
}

const emptyForm = {
  code: '',
  name: '',
  category: 'Makanan',
  price: '',
  cost: '',
  stock: '',
  status: 'active' as ProductStatus,
};

export default function Produk({ products, onAdd, onEdit, onDelete }: ProdukProps) {
  const { push } = useToast();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('Semua');
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [deleteTarget, setDeleteTarget] = useState<Product | null>(null);
  const [saving, setSaving] = useState(false);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      if (category !== 'Semua' && p.category !== category) return false;
      if (search) {
        const q = search.toLowerCase();
        if (!p.name.toLowerCase().includes(q) && !p.code.toLowerCase().includes(q)) return false;
      }
      return true;
    });
  }, [products, search, category]);

  const openAdd = () => {
    setEditing(null);
    setForm({ ...emptyForm, code: `PRD-${String(products.length + 1).padStart(3, '0')}` });
    setModalOpen(true);
  };

  const openEdit = (p: Product) => {
    setEditing(p);
    setForm({
      code: p.code,
      name: p.name,
      category: p.category,
      price: String(p.price),
      cost: String(p.cost),
      stock: String(p.stock),
      status: p.status,
    });
    setModalOpen(true);
  };

  const save = async () => {
    if (!form.name.trim() || !form.code.trim()) {
      push('Nama dan kode produk wajib diisi', 'error');
      return;
    }
    
    setSaving(true);
    
    const priceNum = parseInt(form.price, 10) || 0;
    const costNum = parseInt(form.cost, 10) || 0;
    const stockNum = parseInt(form.stock, 10) || 0;

    try {
      if (editing) {
        const result = await onEdit(editing.id, {
          code: form.code,
          name: form.name,
          category: form.category,
          price: priceNum,
          cost: costNum,
          stock: stockNum,
          status: form.status,
        });
        
        if (result.success) {
          push(`Produk "${form.name}" berhasil diperbarui`, 'success');
          setModalOpen(false);
        } else {
          push(result.error || 'Gagal memperbarui produk', 'error');
        }
      } else {
        const result = await onAdd({
          code: form.code,
          name: form.name,
          category: form.category,
          price: priceNum,
          cost: costNum,
          stock: stockNum,
          status: form.status,
        });
        
        if (result.success) {
          push(`Produk "${form.name}" berhasil ditambahkan`, 'success');
          setModalOpen(false);
        } else {
          push(result.error || 'Gagal menambahkan produk', 'error');
        }
      }
    } catch (error: any) {
      push(error.message || 'Terjadi kesalahan', 'error');
    } finally {
      setSaving(false);
    }
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    
    const result = await onDelete(deleteTarget.id);
    
    if (result.success) {
      push(`Produk "${deleteTarget.name}" dihapus`, 'info');
      setDeleteTarget(null);
    } else {
      push(result.error || 'Gagal menghapus produk', 'error');
    }
  };

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="card flex flex-col gap-3 p-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-1 flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari nama atau kode produk..."
              className="input pl-9"
            />
          </div>
          <select value={category} onChange={(e) => setCategory(e.target.value)} className="input sm:w-48">
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
        <button onClick={openAdd} className="btn-primary shrink-0">
          <Plus className="h-4 w-4" /> Tambah Produk
        </button>
      </div>

      {/* Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50 text-left text-xs font-medium uppercase tracking-wide text-slate-400">
                <th className="px-5 py-3">Kode</th>
                <th className="px-5 py-3">Nama Produk</th>
                <th className="px-5 py-3">Kategori</th>
                <th className="px-5 py-3 text-right">Harga</th>
                <th className="px-5 py-3 text-center">Stok</th>
                <th className="px-5 py-3 text-center">Status</th>
                <th className="px-5 py-3 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filtered.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50">
                  <td className="px-5 py-3 font-medium text-slate-600">{p.code}</td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-xs font-bold text-slate-400">
                        {p.name.charAt(0)}
                      </div>
                      <span className="font-medium text-slate-700">{p.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-slate-500">{p.category}</td>
                  <td className="px-5 py-3 text-right font-medium text-slate-700">{formatRupiah(p.price)}</td>
                  <td className="px-5 py-3 text-center">
                    <span className={`font-medium ${p.stock <= 5 ? 'text-rose-500' : p.stock <= 15 ? 'text-amber-500' : 'text-slate-600'}`}>
                      {p.stock}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-center"><ProductStatusBadge status={p.status} /></td>
                  <td className="px-5 py-3">
                    <div className="flex justify-end gap-1">
                      <button
                        onClick={() => openEdit(p)}
                        className="rounded-lg p-2 text-slate-400 hover:bg-brand-50 hover:text-brand-600"
                        title="Edit"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => setDeleteTarget(p)}
                        className="rounded-lg p-2 text-slate-400 hover:bg-rose-50 hover:text-rose-600"
                        title="Hapus"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-slate-400">
            <Package className="mb-2 h-10 w-10" />
            <p className="text-sm">Tidak ada produk ditemukan</p>
          </div>
        )}
        <div className="border-t border-slate-100 px-5 py-3 text-xs text-slate-400">
          Menampilkan {filtered.length} dari {products.length} produk
        </div>
      </div>

      {/* Add/Edit modal */}
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editing ? 'Edit Produk' : 'Tambah Produk'}
        footer={
          <>
            <button className="btn-secondary" onClick={() => setModalOpen(false)} disabled={saving}>
              Batal
            </button>
            <button className="btn-primary" onClick={save} disabled={saving}>
              {saving ? 'Menyimpan...' : editing ? 'Simpan Perubahan' : 'Tambah Produk'}
            </button>
          </>
        }
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="sm:col-span-1">
            <label className="mb-1.5 block text-xs font-medium text-slate-500">Kode Produk</label>
            <input value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value })} className="input" placeholder="MKN-001" />
          </div>
          <div className="sm:col-span-1">
            <label className="mb-1.5 block text-xs font-medium text-slate-500">Kategori</label>
            <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="input">
              {CATEGORIES.filter((c) => c !== 'Semua').map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          <div className="sm:col-span-2">
            <label className="mb-1.5 block text-xs font-medium text-slate-500">Nama Produk</label>
            <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="input" placeholder="Nasi Goreng Spesial" />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium text-slate-500">Harga Jual</label>
            <input value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value.replace(/[^0-9]/g, '') })} inputMode="numeric" className="input" placeholder="18000" />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium text-slate-500">Harga Modal</label>
            <input value={form.cost} onChange={(e) => setForm({ ...form, cost: e.target.value.replace(/[^0-9]/g, '') })} inputMode="numeric" className="input" placeholder="10000" />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium text-slate-500">Stok</label>
            <input value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value.replace(/[^0-9]/g, '') })} inputMode="numeric" className="input" placeholder="45" />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium text-slate-500">Status</label>
            <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value as ProductStatus })} className="input">
              <option value="active">Aktif</option>
              <option value="inactive">Nonaktif</option>
            </select>
          </div>
        </div>
      </Modal>

      {/* Delete confirm */}
      <Modal
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        title="Hapus Produk"
        size="sm"
        footer={
          <>
            <button className="btn-secondary" onClick={() => setDeleteTarget(null)}>Batal</button>
            <button className="btn-danger" onClick={confirmDelete}>Hapus</button>
          </>
        }
      >
        <p className="text-sm text-slate-600">
          Yakin ingin menghapus produk <span className="font-semibold text-slate-800">{deleteTarget?.name}</span>? Tindakan ini tidak dapat dibatalkan.
        </p>
      </Modal>
    </div>
  );
}
